const mongoose = require('mongoose');

/* Use native promises */
mongoose.Promise = global.Promise;

const dbConnection = mongoose.connect('mongodb://makeer:deloitte2017@ds113925.mlab.com:13925/node-heroku-beawesome');

/* When successfully connected */
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected with mongodb`);
});

/* If the connection throws an error */
mongoose.connection.on('error', err => {
  console.error(`Mongoose default connection error ${err}`);
});

/* When the connection is disconnected */
mongoose.connection.on('disconnected', () => {
  console.error('Mongoose default connection disconnected');
});

/* If the Node process ends, close the Mongoose connection */
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.error('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = dbConnection;
