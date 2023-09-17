"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WorkOrder_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WorkOrder_details.belongsTo(models.Account_list, {
        foreignKey: "account_code",
        as: "account",
      });
    }
  }
  WorkOrder_details.init(
    {
      wo_id: DataTypes.INTEGER,
      account_code: DataTypes.INTEGER,
      amount: DataTypes.DECIMAL,
      description: DataTypes.STRING,
      user: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "WorkOrder_details",
    }
  );
  return WorkOrder_details;
};
