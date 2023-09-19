"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Detail.belongsTo(models.Account_list, {
        foreignKey: "account_code",
        as: "account",
      });
      Detail.belongsTo(models.User, {
        foreignKey: "id",
        as: "details",
      });
      Detail.belongsTo(models.Transaction, {
        foreignKey: "transaction_id",
        as: "transaction_details",
      });
      Detail.belongsTo(models.Work_order, {
        foreignKey: "wo_id",
        as: "wo_details",
      });
    }
  }
  Detail.init(
    {
      category: DataTypes.STRING,
      account_code: DataTypes.INTEGER,
      amount: DataTypes.DECIMAL,
      description: DataTypes.STRING,
      type: DataTypes.STRING,
      user: DataTypes.STRING,
      status: DataTypes.STRING,
      wo_id: DataTypes.INTEGER,
      transaction_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Detail",
    }
  );
  return Detail;
};
