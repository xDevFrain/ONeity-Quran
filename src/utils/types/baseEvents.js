const baseClient = require('@root/src/base/baseClient')

/**
 * @template {keyof import('discord.js').ClientEvents} K
 * @typedef {Object} BaseEvent
 * @property {K} name
 * @property {boolean} once
 * @property {(client: baseClient,...args: import('discord.js').ClientEvents[K]) => import('discord.js').Awaitable<void>} execute
 */

/** @type {BaseEvent} */
module.exports = {
  name: "",
  once: false,
}