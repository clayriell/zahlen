require("dotenv").config();
const { Account_list } = require("../models");

module.exports = {
  create: async (req, res) => {
    try {
      const { id, name, category, type, parent_code } = req.body;

      const idUsed = await Account_list.findOne({ where: { id } });
      if (idUsed) {
        return res.status(409).json({
          status: false,
          message: "account code already exist!",
          data: null,
        });
      }
      const newAccount = await Account_list.create({
        id,
        name,
        category,
        type,
        parent_code,
        balance: 0,
      });

      return res.status(200).json({
        status: true,
        message: "Register success!",
        data: {
          code: newAccount.id,
          name: newAccount.name,
          category: newAccount.category,
          type: newAccount.type,
          parent_code: newAccount.parent_code,
          balance: newAccount.balance,
        },
      });
    } catch (err) {
      //   next(err);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const account = await Account_list.findAll();

      if (!account.length) {
        return res.status(200).json({
          status: false,
          message: "empty data",
          data: account,
        });
      }

      return res.status(200).json({
        status: true,
        message: "Get data success!",
        data: account,
      });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const { code } = req.params;
      const { name, category, type, parent_code } = req.body;
      const accounts = await Account_list.findOne({ where: { id : code } });
      if (!accounts) {
        return res.status(400).json({
          status: false,
          message: "Account not found!",
          data: accounts,
        });
      }

      const updateAccount = await Account_list.update(
        { name, category, type, parent_code, balance: accounts.balance },
        { where: { id : code } }
      );

      const updatedAccount = await Account_list.findOne({ where: { code } });

      return res.status(201).json({
        status: true,
        message: "Accounts Updated Successfully",
        data: updatedAccount,
      });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const accountExist = await Account_list.findOne({ where: { id } });
      if (!accountExist) {
        return res.status(200).json({
          status: false,
          messaage: "Account not found",
          data: accountExist,
        });
      }

      const deleteAccount = await Account_list.destroy({
        where: { id: accountExist.id },
      });
      return res.status(200).json({
        status: true,
        message: "Account Deleted Successfully",
        data: deleteAccount,
      });
    } catch (error) {
      next(error);
    }
  },
  getByParent: async (req, res, next) => {
    try {
      const { parent_code } = req.params;

      const accounts = await Account_list.findAll({ where: { parent_code } });

      if (!accounts.length) {
        return res.status(200).json({
          status: false,
          message: "Parent or parent_code doesn't exist!",
          data: accounts,
        });
      }

      return res.status(200).json({
        status: true,
        message: `Success get all account with parent_code ${parent_code}`,
        data: accounts,
      });
    } catch (error) {
      next(error);
    }
  },
};
