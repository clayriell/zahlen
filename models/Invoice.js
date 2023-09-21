"use strict";
const { Model, InvalidConnectionError } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.belongsTo(models.User, {
        foreignKey: "user",
        as: "updater",
      });
      Invoice.hasMany(models.Transaction, {
        foreignKey: "ref",
        as: "transactions",
      });
      Invoice.belongsTo(models.Work_order, {
        foreignKey: "ref",
        as: "work_order",
      });
    }
  }
  Invoice.init(
    {
      customer: DataTypes.STRING,
      ref: DataTypes.STRING,
      amount: DataTypes.DECIMAL,
      note: DataTypes.STRING,
      user: DataTypes.STRING,
      status: DataTypes.STRING,
      is_paid: DataTypes.BOOLEAN,
      maturity_date: DataTypes.DATEONLY,
      paid_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Invoice",
    }
  );
  return Invoice;
};
