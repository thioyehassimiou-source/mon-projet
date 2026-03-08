const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AIChat = sequelize.define('AIChat', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    sessionID: {
        type: DataTypes.STRING,
    },
    messages: {
        type: DataTypes.JSONB, // Store conversation history as array of {role, content}
        defaultValue: [],
    },
    preferences: {
        type: DataTypes.JSONB, // User preferences extracted by AI
        defaultValue: {},
    }
});

module.exports = AIChat;
