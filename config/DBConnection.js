const mySQLDB = require('./DBConfig');
const user = require('../models/User');
const setUpDB = (drop) => {

    mySQLDB.authenticate()
    .then(() => {
        console.log('Connected to MySQL database');
    })
    .then(() => {
        mySQLDB.sync({
            force: drop
        }).then(() => {
            user;
            console.log('Create tables if none exists');
        }).catch(err => console.log(err))
    })
    .catch(err => console.log(`Error: ${err}`));
};

module.exports = {
    setUpDB
};