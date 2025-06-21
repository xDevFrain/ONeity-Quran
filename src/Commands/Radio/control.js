const controlData = require('@utils/functions/ControlData');
const joinAndPlayQuran = require('@utils/functions/joinAndPlayQuran');
const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder } = require('discord.js');

/**
 * @type {import("@utils/types/baseCommand")}
 */
module.exports = {
  name: "control",
  description: "Control radio panel",
  category: "ADMIN",
  botPermissions: ["ManageChannels", "SendMessages", "ViewChannel"],
  userPermissions: ["ManageChannels"],
  cooldown: 1000,
  command: {
    enabled: false,
    minArgsCount: 1,
  },
  slashCommand: {
    enabled: true,
  },

  async msgExecute(client, message, args, lang) {
    try {
      const db = await client.db.table("channels");

      let data = await db.get(`${interaction.guildId}_radioChannel`);


      if (controlData(client, data)?.content) return message.reply(controlData(client, data));

      message.channel.send(controlData(client, data));

    } catch (err) {
      console.log(err)
    }
  },

  async interactionExecute(client, interaction, lang) {
    await interaction.deferReply({ ephemeral: true })
    try {
      const db = await client.db.table("channels");

      let data = await db.get(`${interaction.guildId}_radioChannel`)

      if (controlData(client, data)?.content) return interaction.editReply(controlData(client, data))

      let msg = await interaction.channel.send(controlData(client, data))
      if (!msg) return interaction.editReply({ content: "⚠ | ليس لدي صلاحيه لارسال الرساله داخل القناه " })
      await db.set(`${interaction.guildId}_radioChannel..ch`, interaction.channelId)
      await db.set(`${interaction.guildId}_radioChannel..msgId`, msg.id)
      interaction.editReply({ content: "**تم ارسال لوحه التحكم**", ephemeral: true })


    } catch (err) {
      interaction.editReply({ content: "**⚠ | ليس لدي صلاحيه لارسال الرساله داخل القناه**" })

      console.log(err.message + `Server: ${interaction.guild.name} cant send message`);
    }
  },
};
