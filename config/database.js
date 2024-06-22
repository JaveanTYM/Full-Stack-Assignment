const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DB,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT
};