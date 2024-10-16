const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");



/**
 * 
 * @param {import("discord.js").ChatInputCommandInteraction | import("discord.js").Message } interaction 
 * @returns {import("discord.js").MessageReplyOptions}
 */
function help(interaction) {
  let em = new EmbedBuilder()
    .setAuthor({ name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() })
    .setColor("White")
    .setTimestamp()
    .setThumbnail(interaction.client.user.displayAvatarURL())
    .setTitle("Help Commands | قائمة الاوامر ")
    .addFields([
      { name: "/help", value: "Shows this message || اوامر المساعدة", inline: true },
      { name: "/ping", value: "Shows bot ping || البنج", inline: true },
      { name: "/setup radio", value: "setup radio channel || تسطيب القناه الصوتية", inline: true },
      { name: "/setup azkar", value: "setup azkar channel || تسطيب الاذكار", inline: true },
      { name: "/control", value: "control radio channel || التحكم بالراديو", inline: true }
    ])
    .setFooter({
      text: interaction.author ? `Requested by ${interaction.author.globalName}` : `Requested by ${interaction.member.user.globalName}`,
      iconURL: interaction.author ? interaction.author.displayAvatarURL() : interaction.member.user.displayAvatarURL()
    })

  let btnStatus = new ButtonBuilder()
    .setCustomId("status_bot")
    .setStyle("Primary")
    .setLabel("Bot Status")

  let row = new ActionRowBuilder().addComponents(btnStatus)

  return { embeds: [em], components: [row] }
}


/**
 * @type {import("@utils/types/baseCommand")}
 */
module.exports = {
  name: "help",
  description: "Help commands",
  category: "UTILITY",
  botPermissions: ["SendMessages"],
  userPermissions: ["SendMessages"],
  cooldown: 1000,
  command: {
    enabled: true,
    minArgsCount: 0,
  },
  slashCommand: {
    enabled: true,
  },

  async msgExecute(client, message, args, lang) {
    try {

      message.reply(help(message))

    } catch (err) {
      console.log(err)
    }

  },

  async interactionExecute(client, interaction, lang) {
    try {

      interaction.reply(help(interaction));

    } catch (err) {
      console.log(err);
      interaction.reply({
        content: "An error occurred while executing the command",
        ephemeral: true,
      });
    }

  },
};