require('dotenv').config();
const pg = require('pg')
pg.defaults.ssl = {
   rejectUnauthorized: false,
}

// const parse = require("pg-connection-string").parse;
// const pgconfig = parse(process.env.TEST_DB_URL);

// console.log(process.env);

module.exports = {
  development: {
    client: 'pg',
    // connection: process.env.DATABASE_URL,
    connection: process.env.TEST_DB_URL,
    // connection: pgconfig,
    ssl: {
      rejectUnauthorized: false,  
    },
    ssl: 'no-verify' // try this if above does not work for you
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
