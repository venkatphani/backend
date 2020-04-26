// Update with your config settings.

module.exports = {
  development: {
    client: "mongo",
    connection: {
      host: process.env.MONGODB_URL_PORT,
      database: process.env.MONGODB_DATABASE,
      port: process.env.MONGODB_PORT,
      user: process.env.MONGODB_USERNAME,
      password: process.env.MONGODB_PASSWORD,
    },
  },
  production: {
    client: "mongo",
    connection: {
      host: process.env.MONGODB_URL_PORT,
      database: process.env.MONGODB_DATABASE,
      port: process.env.MONGODB_PORT,
      user: process.env.MONGODB_USERNAME,
      password: process.env.MONGODB_PASSWORD,
    },
  },
};
