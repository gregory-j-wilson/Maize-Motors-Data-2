// Update with your config settings.

// var dotenv = require('dotenv')
// dotenv.config({ path: './.env'})

var pg = require('pg');
pg.defaults.ssl = true;

module.exports = {

  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      host: "ec2-18-214-208-89.compute-1.amazonaws.com",
      port: 5432,
      user: "dybviwxhczerlh",
      password: "66cdd0ed389348667709edd2ddc50dc1fdada7c32da4655c093dedfe156e5cb7",
      database: "d6b19ubq85o71",
      ssl: {rejectUnauthorized: false},
     },
    migrations: {
      directory: './database/migrations' 
    },
    seeds: {
      directory: './database/seeds'
    },
    ssl: {rejectUnauthorized: false}
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
      host: "ec2-18-214-208-89.compute-1.amazonaws.com",
      port: 5432,
      user: "dybviwxhczerlh",
      password: "66cdd0ed389348667709edd2ddc50dc1fdada7c32da4655c093dedfe156e5cb7",
      database: "d6b19ubq85o71",
      ssl: {rejectUnauthorized: false},
     },
    migrations: {
      directory: './database/migrations' 
    },
    seeds: {
      directory: './database/seeds'
    },
    ssl: {rejectUnauthorized: false}
  }

};