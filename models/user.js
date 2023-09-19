"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Work_order, {
        foreignKey: "applicant",
        as: "work_orders",
      });
      User.hasMany(models.Detail, {
        foreignKey: "user",
        as: "items_added",
      });
      User.hasMany(models.Invoice, {
        foreignKey: "user",
        as: "invoices",
      });
      User.hasMany(models.Transaction, {
        foreignKey: "user",
        as: "created_by",
      });
      
    }
  }
  User.init(
    {
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
