require('dotenv').config();

const parse = require("pg-connection-string").parse;
const pgconfig = parse(process.env.DATABASE_URL);
// const pgconfig = parse(process.env.TEST_DB);

// Add SSL setting to default environment variable
pgconfig.ssl = { rejectUnauthorized: false };

module.exports = {
  development: {
    client: 'pg',
    connection: pgconfig
  },

  production: {
    client: 'pg',
    connection: pgconfig
  }
};
