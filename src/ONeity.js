const { baseClient } = require("@root/src/base")

class ONeity extends baseClient {
  /**
   *
   * @constructor
   * @param {ONeityConfiguration} options
   */
  constructor(options) {
    super(options.CustomClientOptions, options.database)
    this.datainput = options
    this.loadEvents("src/events")
    this.loadComponents("src/ComponentsAction")
    this.loadCommands("src/Commands")
    this.Checker()

  };

  /**
   * @param {string} [token]
   */
  botlogin(token = this.datainput.token) {
    this.login(process.env.token || token).catch((err) => {
      console.log(err)
      this.logger.debug(err.message)
    })

  };
};

module.exports = ONeity;


/**
 * @typedef {"MONGODB"|"Sqlite"|"JSON"|"MySQL"} DataBaseType
 */

/**
 * @typedef {object} DataBase
 * @property {DataBaseType} database_type
 * @property {import("good.db/dist/Types").goodDBOptions} [options]
 * @property {import("good.db/dist/Types").MongoDBDriverOptions} [MongoDB]
 * @property {import("mysql2").PoolOptions} [MySQL]
 * 
 */

/**
 * @typedef {object} ONeityConfiguration
 *
 * @property {string} token 
 * 
 * @property {DataBase} database
 * 
 * @property {import("discord.js").ClientOptions} [CustomClientOptions={}]
 * 
 */