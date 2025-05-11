const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/db');
const UserModel = require('./user');
const ImageModel = require('./image');

const User = UserModel(sequelize, Sequelize);
const Image = ImageModel(sequelize, Sequelize);

// Set up associations
User.hasMany(Image);
Image.belongsTo(User);

module.exports = {
  sequelize,
  User,
  Image
};