"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {
        foreignKey: "user",
        as: "transactions",
      });
      Transaction.hasMany(models.Detail, {
        foreignKey: "transaction_id",
        as: "transaction",
      });
      Transaction.belongsTo(models.Invoice, {
        foreignKey: "ref",
        as: "invoices",
      });
    }
  }
  Transaction.init(
    {
      category: DataTypes.STRING,
      amount: DataTypes.DECIMAL,
      note: DataTypes.STRING,
      ref: DataTypes.STRING,
      user: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
