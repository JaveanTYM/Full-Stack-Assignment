const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/DBConfig');

// User model
const User = db.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    first_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    role: {
        type: DataTypes.ENUM('Consumer', 'Admin'),
        allowNull: false
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN
    }
}, {
    timestamps: false,
    tableName: 'Users'
});

// Users_Info model
const UsersInfo = db.define('UsersInfo', {
    contact_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    phone_no: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    postal_code: {
        type: DataTypes.STRING(10),
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'Users_Info'
});

// Define associations
User.hasOne(UsersInfo, { foreignKey: 'user_id' });
UsersInfo.belongsTo(User, { foreignKey: 'user_id' });

module.exports = User;