//configurate which config in knexfile.js genutzt werden soll

const dbEngine = process.env.DB_ENVIRONMENT || 'development';
//value von dbEngine wird an config gegeben und dann an knexfile.js
const config = require('./knexfile')[dbEngine];

module.exports = require('knex')(config);