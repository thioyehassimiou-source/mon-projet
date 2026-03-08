const sequelize = require('../config/database');
const User = require('./User');
const Listing = require('./Listing');
const Image = require('./Image');
const { Conversation, Message } = require('./Message');
const Payment = require('./Payment');
const AIChat = require('./AIChat');

// User <-> Listing (Owner)
User.hasMany(Listing, { as: 'ownedListings', foreignKey: 'ownerID' });
Listing.belongsTo(User, { as: 'owner', foreignKey: 'ownerID' });

// Listing <-> Image
Listing.hasMany(Image, { as: 'images', foreignKey: 'listingID', onDelete: 'CASCADE' });
Image.belongsTo(Listing, { foreignKey: 'listingID' });

// User <-> Conversation (Participants)
User.belongsToMany(Conversation, { through: 'UserConversations' });
Conversation.belongsToMany(User, { through: 'UserConversations' });

// Conversation <-> Message
Conversation.hasMany(Message, { as: 'messages', foreignKey: 'conversationID', onDelete: 'CASCADE' });
Message.belongsTo(Conversation, { foreignKey: 'conversationID' });

// Message <-> Sender (User)
User.hasMany(Message, { foreignKey: 'senderID' });
Message.belongsTo(User, { as: 'sender', foreignKey: 'senderID' });

// User <-> Payment
User.hasMany(Payment, { foreignKey: 'userID' });
Payment.belongsTo(User, { foreignKey: 'userID' });

// Listing <-> Payment
Listing.hasMany(Payment, { foreignKey: 'listingID' });
Payment.belongsTo(Listing, { foreignKey: 'listingID' });

// User <-> AIChat
User.hasMany(AIChat, { foreignKey: 'userID' });
AIChat.belongsTo(User, { foreignKey: 'userID' });

module.exports = {
    sequelize,
    User,
    Listing,
    Image,
    Conversation,
    Message,
    Payment,
    AIChat
};
