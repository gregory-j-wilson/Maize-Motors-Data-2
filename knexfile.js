// Update with your config settings.

var dotenv = require('dotenv')
dotenv.config({ path: './.env'})

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/chaqardata.db3'
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
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './database/migrations' 
    },
    seeds: {
      directory: './database/seeds'
    }
  }

};