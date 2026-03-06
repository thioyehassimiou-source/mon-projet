const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Image = sequelize.define('Image', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alt: {
        type: DataTypes.STRING,
    },
    isMain: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

module.exports = Image;
