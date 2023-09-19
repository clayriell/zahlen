"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Work_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Work_order.belongsTo(models.User, {
        foreignKey: "applicant",
        as: "user",
      });
      Work_order.hasMany(models.Detail, {
        foreignKey: "wo_id",
        as: "wo_details",
      });
    }
  }
  Work_order.init(
    {
      applicant: DataTypes.STRING,
      details: DataTypes.STRING,
      customer: DataTypes.STRING,
      submitted_by: DataTypes.STRING,
      ammount: DataTypes.DECIMAL,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Work_order",
    }
  );
  return Work_order;
};
