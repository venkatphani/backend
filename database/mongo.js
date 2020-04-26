const config = require("./mongofile");

const databaseConfig = process.env.NODE_ENV === "production" ? config.production.connection : config.development.connection;
module.exports = databaseConfig;
