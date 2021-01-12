const initOptions = {

  // pg-promise initialization options...

  receive(data, result, e) {
    camelizeColumns(data);
  },
};

function camelizeColumns(data) {
  const tmp = data[0];
  for (const prop in tmp) {
    const camel = pgp.utils.camelize(prop);
    if (!(camel in tmp)) {
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        d[camel] = d[prop];
        delete d[prop];
      }
    }
  }
}

const pgp = require('pg-promise')(initOptions);

// Get the values for these variables from configuration
const user = process.env.DB_USER || 'postgres';
const password = process.env.DB_PASSWORD || 'ork33jfk';
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 5432;
const database = process.env.DB_DATABASE || 'danish_db';

const isProduction = process.env.NODE_ENV === 'production';

// Use a symbol to store a global instance of a connection, and to access it from the singleton.
const DB_KEY = Symbol.for('MyApp.db');
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasDb = (globalSymbols.indexOf(DB_KEY) > -1);

const connectionString = `postgres://${user}:${password}@${host}:${port}/${database}`;

if (!hasDb) {
  global[DB_KEY] = pgp(isProduction ? process.env.DATABASE_URL : connectionString);
}

// Create and freeze the singleton object so that it has an instance property.
const singleton = {};
Object.defineProperty(singleton, 'instance', {
  get() {
    return global[DB_KEY];
  },
});

Object.freeze(singleton);
module.exports = singleton;
