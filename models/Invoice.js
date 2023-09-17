'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invoice.init({
    number: DataTypes.STRING,
    customer: DataTypes.STRING,
    ref: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    note: DataTypes.STRING,
    user: DataTypes.STRING,
    status: DataTypes.STRING,
    is_paid: DataTypes.BOOLEAN,
    maturity_date: DataTypes.DATEONLY,
    paid_date: DataTypes.DATE,
    transaction_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};