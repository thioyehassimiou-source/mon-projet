const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    commission: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    paymentMethod: {
        type: DataTypes.ENUM('orange_money', 'mtn_money', 'bank_transfer', 'cash'),
        defaultValue: 'orange_money',
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed', 'cancelled'),
        defaultValue: 'pending',
    },
    transactionReference: {
        type: DataTypes.STRING,
        unique: true,
    },
    metadata: {
        type: DataTypes.JSONB,
        defaultValue: {},
    }
});

module.exports = Payment;
