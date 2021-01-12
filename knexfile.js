// Update with your config settings.

// var dotenv = require('dotenv')
// dotenv.config({ path: './.env'})

// var pg = require('pg');
// pg.defaults.ssl = true;

module.exports = {

  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './database/migrations' 
    },
    seeds: {
      directory: './database/seeds'
    },
    ssl: true
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/testchaqardata.db3'
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
      },
    },
    migrations: {
      directory: './database/migrations' 
    },
    seeds: {
      directory: './database/seeds'
    }
  },


  production: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      host: "ec2-52-44-46-66.compute-1.amazonaws.com",
      port: 5432,
      user: "svyllxwlkngwhk",
      password: "48064fcca22c1a5ccb26ce6430351e5618a12f1edb49663eedde5807ce83be1e",
      database: "d245s3eoecht9v",
      ssl: true,
     },
    migrations: {
      directory: './database/migrations' 
    },
    seeds: {
      directory: './database/seeds'
    },
    ssl: true
  }

};