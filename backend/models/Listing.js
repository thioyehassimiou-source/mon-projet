const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Listing = sequelize.define('Listing', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING(8),
        defaultValue: 'GNF',
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    neighborhood: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.TEXT,
    },
    propertyType: {
        type: DataTypes.ENUM('apartment', 'house', 'land', 'studio', 'villa', 'other'),
        defaultValue: 'apartment',
    },
    listingType: {
        type: DataTypes.ENUM('rent', 'sale'),
        defaultValue: 'rent',
    },
    status: {
        type: DataTypes.ENUM('active', 'pending', 'suspended', 'rented', 'sold'),
        defaultValue: 'pending',
    },
    bedrooms: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    bathrooms: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    surfaceArea: {
        type: DataTypes.INTEGER,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isPremium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    locationLat: {
        type: DataTypes.DECIMAL(9, 6),
    },
    locationLng: {
        type: DataTypes.DECIMAL(9, 6),
    },
    // Features / Amenities
    nearUniversity: { type: DataTypes.BOOLEAN, defaultValue: false },
    nearHospital: { type: DataTypes.BOOLEAN, defaultValue: false },
    nearMarket: { type: DataTypes.BOOLEAN, defaultValue: false },
    nearTransport: { type: DataTypes.BOOLEAN, defaultValue: false },

    // Requirement / Exigences (JSONB support requested)
    requirements: {
        type: DataTypes.JSONB,
        defaultValue: {},
    }
});

module.exports = Listing;
