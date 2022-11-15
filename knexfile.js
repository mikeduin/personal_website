require('dotenv').config();

const parse = require("pg-connection-string").parse;
const pgconfigProd = parse(process.env.DATABASE_URL);
// const pgconfigDev = parse(process.env.TEST_DB_URL);
const pgconfigDev = parse(process.env.DATABASE_URL);

// Add SSL setting to default environment variable
pgconfigProd.ssl = { rejectUnauthorized: false };
pgconfigDev.ssl = { rejectUnauthorized: false };

module.exports = {
  development: {
    client: 'pg',
    connection: pgconfigDev
  },

  production: {
    client: 'pg',
    connection: pgconfigProd
  }
};
