
const ms = require('ms');
const getAzkar = require('./../helpers/azkar.json');
const drawZekr = require('./drawZekr');
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { baseClient } = require('@root/src/base');

/**
 * @typedef {Object} azkarChannelData
 * @property {string} channelId
 * @property {string} guildId
 * @property {boolean} enabled
 * @property {string} msgTimeSend
 * @property {string[]} category
 * @property {string[]} roles
 * @property {number} lastSned
 * @property {boolean} embed
 */



/**
 *
 * @param {baseClient} client
 * @param {import("discord.js").Guild} guild
 * @param {azkarChannelData} data
 * @param {boolean} [isTest=false]
 * @returns {Promise<boolean>}
 */
module.exports = async function SendAzkar(client, guild, data, isTest = false) {

  let db = await client.db.table("channels");

  return new Promise(async (resolve, reject) => {


    const isDone = true;

    let data2 = await db.get(`${guild.id}_azkarChannel`);

    if (!isTest) {

      clearTimeout(client.Azkar.get(guild.id));

      let timeout = setTimeout(async function () {

        let isGuild = client.guilds.cache.get(guild.id) || await client.guilds.fetch(guild.id).catch(() => null);
        
        if (!isGuild) {
          await db.set(`${guild.id}_azkarChannel..enabled`, false);
          clearTimeout(client.Azkar.get(guild.id));
          client.Azkar.delete(guild.id);
          return resolve(false);
        }
        await SendAzkar(client, isGuild, data2);

      }, ms(data2.msgTimeSend));

      client.Azkar.set(guild.id, timeout);
    }



    /** @type {import("discord.js").TextChannel} */
    let channel = guild.channels.cache.get(data?.channelId) || await guild.channels.fetch(data?.channelId).catch(() => null);

    if (!channel) return resolve(!isDone);

    if (data?.enabled) {

      let idCat = data?.category?.[Math.floor(Math.random() * data?.category?.length)];
      let lastSned = Date.now();

      if (idCat) {

        if (idCat === "azkar") idCat = ["azkar", "any"][Math.floor(Math.random() * 2)];

        let AzkarFilter = getAzkar.filter(azkar => azkar.id === idCat);

        let zekr = AzkarFilter[Math.floor(Math.random() * AzkarFilter.length)];
        // let zekr = getAzkar[0]

        let image = await drawZekr(zekr);

        let attachment = new AttachmentBuilder(image.imageBuffer, { name: 'zekr.png' });
        let embed = new EmbedBuilder()
          .setColor("White")
          .setDescription(image.description)
          .setImage('attachment://zekr.png');

        /** @type {import("discord.js").Message} */
        let sender = { files: [attachment] }

        data.roles.length > 0
          ? sender.content = data.roles.map(role => `<@&${role}>`).join(" ")
          : sender.content = "** **";

        if (data?.embed) sender.embeds = [embed];

        else sender.content += "\n" + image.description;


        if (data.lastSned < Date.now() - (ms(data?.msgTimeSend)) && !isTest) {

          let doneSend = await channel.send(sender).catch(() => null);

          if (!isTest) await db.set(`${guild.id}_azkarChannel..lastSned`, lastSned)

          if (doneSend) {

            resolve(isDone);

          } else {
            console.log(`Can't send azkar in ${channel.name}`)
            resolve(!isDone);
          }

        }
        if (isTest) {

          let doneSend = await channel.send(sender).catch(() => null);

          if (doneSend) {

            resolve(isDone);

          } else {

            console.log(`Can't send azkar in ${channel.name}`)
            resolve(!isDone);
          }


        }
      }
    }

  })



}