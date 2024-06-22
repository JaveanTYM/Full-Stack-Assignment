const Sequelize = require('sequelize');

const db = require('./database');

 const sequelize = new Sequelize(db.database, db.username, db.password, { 
    host: db.host, 
    dialect: 'mysql',
    port:db.port, 
    logging: console.log,
    operatorsAliases: 0, 
    
    define: { 
        timestamps: false 
    }, 
    
    pool: { 
        max: 5, 
        min: 0, 
        acquire: 30000, 
        idle: 10000 
    }, 
}); 

module.exports = sequelize;