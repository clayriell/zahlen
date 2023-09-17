"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction_details.belongsTo(models.Account_list, {
        foreignKey: "account_code",
        as: "account",
      });
    }
  }
  Transaction_details.init(
    {
      category: DataTypes.STRING,
      transaction_id: DataTypes.INTEGER,
      account_code: DataTypes.INTEGER,
      amount: DataTypes.DECIMAL,
      description: DataTypes.STRING,
      type: DataTypes.STRING,
      user: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction_details",
    }
  );
  return Transaction_details;
};
