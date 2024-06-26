const Mongoose = require('mongoose');
const debug = require('debug')('app:database');

const dbhost = process.env.DBHOST || 'localhost';
const dbport = process.env.DBPORT || '27017';
const dbname = process.env.DBNAME || 'backpack';

const dburi = process.env.DBURI || 
  `mongodb://${dbhost}:${dbport}/${dbname}`;

/**
 * Connect to the database
 */

const connect = async () => {
  try {
    await Mongoose.connect(dburi);
    debug("Connected to the database");
  } catch (error) {
    console.error(error);
    debug("Failed to connect to the database");
    process.exit(1);
  }
}

/**
 * Disconnect to the database
 */

const disconnect = async () => {
  try {
    await Mongoose.disconnect();
    debug("Disconnected from database");
  } catch (error) {
    process.exit(1);
  }
}

module.exports = { 
  connect,
  disconnect
}