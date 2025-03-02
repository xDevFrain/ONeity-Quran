const { VoiceState } = require("discord.js");



module.exports = class VoiceUtils {

  /**
   *
   *
   * @param {VoiceState | import("discord.js").VoiceChannel} voiceState
   * @param {boolean} [isMeChannel=false]
   * @return {boolean}
   */
  static isVoiceChannelEmpty(voiceState, isMeChannel = false) {
    const guild = voiceState.guild;
    const clientId = voiceState.client.user?.id;
    if (!guild || !clientId) return false;
    const voiceChannel = isMeChannel ? guild.members.me?.voice?.channel : voiceState;
    if (!voiceChannel) return false;
    const members = voiceChannel.members.filter((m) => !m.user.bot);
    return !members.size;
  }


}