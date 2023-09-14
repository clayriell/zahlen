'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Account_list.init({
    code: DataTypes.INTEGER,
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    type: DataTypes.STRING,
    parent_code: DataTypes.INTEGER,
    balance: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Account_list',
  });
  return Account_list;
};