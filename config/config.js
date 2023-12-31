require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PW,
    "database": process.env.DB_NAME,
    "host": "127.0.0.1",
    "dialect": "mysql",
  },
  // You can add other environments like test or production as needed.
};
