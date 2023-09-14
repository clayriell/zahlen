require("dotenv").config();
const { Account_list } = require("../models");

module.exports = {
  create: async (req, res) => {
    try {
      const { code, name, category, type, parent_code } = req.body;

      // Check Code
      const codeUsed = await Account_list.findOne({ where: { code } });
      if (codeUsed) {
        return res.status(409).json({
          status: false,
          message: "account code already exist!",
          data: null,
        });
      }
      const newAccount = await Account_list.create({
        code,
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
          code: newAccount.code,
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
};
