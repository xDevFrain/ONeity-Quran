const baseClient = require('@root/src/base/baseClient')
const lang = require("@root/lang/en.json")

/**
 * @typedef {Object} Validation
 * @property {function} callback
 * @property {string} message
 */

/**
 * @typedef {Object} SubCommand
 * @property {string} trigger
 * @property {string} description
 */

/**
 * @typedef {"ADMIN"|"ANIME"|"AUTOMOD"|"ECONOMY"|"FUN"|"IMAGE"|"INFORMATION"|"INVITE"|"MODERATION"|"NONE"|"OWNER"|"SOCIAL"|"PUBLIC"|"TICKET"|"UTILITY"} CommandCategory
 */

/**
 * @typedef {Object} InteractionInfo
 * @property {boolean} enabled
 * @property {boolean} ephemeral
 * @property {import('discord.js').ApplicationCommandOptionData[]} options
 */

/**
 * @typedef {Object} CommandInfo
 * @property {boolean} enabled
 * @property {string[]} [aliases]
 * @property {string} [usage=""]
 * @property {number} [minArgsCount=0]
 * @property {SubCommand[]} [subcommands=[]]
 */

/**
 * @typedef {Object} CommandData
 * @property {string} name
 * @property {string} description
 * @property {number} cooldown
 * @property {CommandCategory} category
 * @property {string} [about]
 * @property {import('discord.js').PermissionResolvable[]} [botPermissions]
 * @property {import('discord.js').PermissionResolvable[]} [userPermissions]
 * @property {Validation[]} [validations]
 * @property {CommandInfo} command
 * @property {InteractionInfo} slashCommand
 * @property {function(baseClient,import('discord.js').Message, string[], lang)} msgExecute
 * @property {function(baseClient,import('discord.js').ChatInputCommandInteraction, lang)} interactionExecute
 * @property {function(baseClient,import('discord.js').AutocompleteInteraction)} autocompleteExecute
 */

/**
 *
 * @type {CommandData}
 */
module.exports = {
  name: "",
  description: "",
  cooldown: 0,
  isPremium: false,
  category: "NONE",
  botPermissions: [],
  userPermissions: [],
  validations: [],
  command: {
    enabled: true,
    aliases: [],
    usage: "",
    minArgsCount: 0,
    subcommands: [],
  },
  slashCommand: {
    enabled: true,
    ephemeral: false,
    options: [],
  },
  ownerOnly: false,
  msgExecute: (client, message, args, lang) => { },
  interactionExecute: (client, interaction, lang) => { },
  autocompleteExecute: (client, interaction) => { },
};