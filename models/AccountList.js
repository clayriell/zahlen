'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccountList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AccountList.init({
    code: DataTypes.INTEGER,
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    parent: DataTypes.STRING,
    balance: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'AccountList',
  });
  return AccountList;
};