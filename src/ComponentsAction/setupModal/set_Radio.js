const { ButtonStyle, ButtonBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ChannelType } = require("discord.js");

/**
 * @type {import("@utils/types/baseComponent")}
 */
module.exports = {
  name: "set_RadioChannel",
  enabled: true,
  /**
   * @param {import("discord.js").ChannelSelectMenuInteraction} interaction 
   */
  async action(client, interaction, parts, lang) {
    try {

      // let channelId = interaction.fields.getTextInputValue("RadioChannel").trim()

      let channel = interaction.channels.first() //await interaction.guild.channels.fetch(channelId).catch(e => null) || interaction.guild.channels.cache.find(ch => ch.name === channelId)
      if (!channel) return interaction.reply({
        content: "❌ | لم يتم العثور علي القناه الصوتيه",
        ephemeral: true
      })
      let data = await client.db.table("channels").get(`${interaction.guildId}_radioChannel`)

      if (channel.type === ChannelType.GuildVoice) {

        let isChannel = await client.db.table("channels").get(`${interaction.guildId}_radioChannel`)

        if (isChannel?.channelId === channel.id) return interaction.reply({
          content: ":warning: | هذه القناه تم تعينها بالفعل من قبل ",
          ephemeral: true
        })

        await client.db.table("channels").set(`${interaction.guildId}_radioChannel`, {
          channelId: channel.id,
          guildId: interaction.guildId,
          url: data?.url || "http://n02.radiojar.com/v33ay8543d0uv?rj-ttl=5&rj-tok=AAABgDTqH90AIyBNaL5t4qE1IA",
          enabled: data?.enabled || false,
          ch: data?.ch || null,
          msgId: data?.msgId || null
        })

        interaction.reply({
          content: `✅ | تم تعين القناه الصوتيه ${channel}\n يمكنك التشغيل و الايقاف  وتغير الاذاعة عبر استخدام امر /control حتي يمكنك التحكم به`,
          ephemeral: true
        })

      } else interaction.reply({
        content: `🛑 | هذه ليست قناه صوتيه ${channel} من فضلك قم بتعين قناه صوتيه بشكل صحيح`,
        ephemeral: true
      })

    } catch (err) {
      console.log(err)
    }
  },
};
