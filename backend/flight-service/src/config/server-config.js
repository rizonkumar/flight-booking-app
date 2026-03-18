const dotenv = require("dotenv");

dotenv.config();

const ServerConfig = {
  PORT: process.env.PORT,
};

module.exports = { ServerConfig };
