const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'tasks.db'
});

const Task = sequelize.define('Task', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false,
    tableName: 'tasks'
});


module.exports = { Task, sequelize };
