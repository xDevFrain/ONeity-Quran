const { EmbedBuilder } = require("discord.js");

/**
 * @type {import("@utils/types/baseCommand")}
 */
module.exports = {
  name: "info",
  description: "Displays bot info information",
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
      const UserCount = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);

      const embed = createStatusEmbed(client, UserCount);
      
      client.logger.log(`${client.user.username} Status Command used by ${message.author.tag} in ${message.guild.name}`);
      await message.reply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
    }
  },

  async interactionExecute(client, interaction, lang) {
    try {
      const UserCount = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);

      const embed = createStatusEmbed(client, UserCount);
      
      client.logger.log(`${client.user.username} Status Command used by ${interaction.user.tag} in ${interaction.guild.name}`);
      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: "❌ An error occurred" });
    }
  },
};

function createStatusEmbed(client, UserCount) {
  return new EmbedBuilder()
    .setTitle("**Bot Info** | **معلومات البوت**")
    .setColor("White")
    .setAuthor({ 
      name: client.user.username, 
      iconURL: client.user.displayAvatarURL(), 
      url: client.config.DevXorLink 
    })
    .setFooter({ 
      text: client.config.Copyright.text, 
      iconURL: client.config.Copyright.logo 
    })
    .setImage("https://i.pinimg.com/originals/6c/76/32/6c76328c235c489736330d743515500c.jpg")
    .addFields([
      { name: "Bot Name | اسم البوت", value: `**${client.user.username}**`, inline: true },
      { name: "Bot ID", value: `\`${client.user.id}\``, inline: true },
      { name: "Server Count | عدد السيرفرات", value: `\`${client.guilds.cache.size}\`` },
      { name: "Channel Listening Count | عدد قنوات الاستماع", value: `\`${client.Radio.size}\`` },
      { name: "Channel Azkar Count | عدد قنوات الاذكار", value: `\`${client.Azkar.size}\`` },
      { name: "Channel Count | عدد القنوات", value: `\`${client.channels.cache.size}\`` },
      { name: "User Count | عدد المستخدمين", value: `\`${UserCount}\`` },
      { name: "Ping | سرعة استجابة البوت", value: `\`${client.ws.ping}ms\` 🏓`, inline: true },
      { name: "Version | الاصدار", value: `\`${require('../../../package.json').version}\``, inline: true },
      { name: "Developer | المطور", value: `**${require('../../../package.json').author.name}**`, inline: false },
      { name: "Developer github | حساب المطور", value: `**${require('../../../package.json').author.url}**`, inline: false },
    ]);
}