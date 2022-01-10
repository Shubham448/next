const dotenv = require('dotenv');
dotenv.config();
const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD } = process.env;

const dbConfig ={
  "username": DB_USER,
  "password": null,
  "database": DB_NAME,
  "host": DB_HOST,
  "dialect": 'mysql'
};

module.exports = dbConfig;
