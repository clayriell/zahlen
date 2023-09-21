require("dotenv").config();

const jwt = require("jsonwebtoken");
const { Invoice, User, Detail, Work_order, Transaction } = require("../models");
const { WO_STATUS, CATEGORY, INV_STATUS, TYPE } = require("../utils/enum");
const { JWT_SECRET } = process.env;

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const invoices = await Invoice.findAll();

      if (!invoices.length) {
        return res.status(200).json({
          status: false,
          message: "empty data",
          data: invoices,
        });
      }
      return res.status(200).json({
        status: true,
        message: "Success get all Invoices",
        data: invoices,
      });
    } catch (error) {}
  },
  getByNumber: async (req, res, next) => {
    try {
      const number = req.query.number;

      const invoice = await Invoice.findOne(
        {
          include: [
            {
              model: Work_order,
              as: "work_order",
              include: [{ model: Detail, as: "wo_details" }],
            },
          ],
        },
        { where: { id: number } }
      );

      if (!invoice) {
        return res.status(200).json({
          status: false,
          message: "invoice not found",
          data: invoice,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success get invoice data",
        data: invoice,
      });
    } catch (error) {
      next(error);
    }
  },
  payment: async (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      const { number, amount, account_code } = req.body;

      const invoice = await Invoice.findOne({
        where: { id: number },
        include: [{ model: Transaction, as: "transactions" }],
      });
      // const transaction = await Transaction.findAll({ where: { ref: number } });
      // console.log(transaction);
      if (!invoice) {
        return res.status(200).json({
          status: false,
          message: "invoice not found",
          data: invoice,
        });
      }

      const user = jwt.verify(token, JWT_SECRET);

      //CHECK IF INVOICE HAS BEEN PAID
      if (invoice.is_paid == true) {
        return res.status(200).json({
          status: false,
          message: "invoice has been paid",
          data: {
            stauts: invoice.status,
            paid_date: invoice.paid_date,
            payee: invoice.user,
            // transaction: transaction,
          },
        });
      }

      //PARTIAL PAYMENT
      if (amount < invoice.amount) {
        const payment = await Transaction.create({
          category: CATEGORY.SALES,
          amount,
          note: "Pembayaran sebagian",
          ref: number,
          user: user.username,
        });
        const createDetail = await Detail.create({
          category: CATEGORY.SALES,
          transaction_id: payment.id,
          account_code,
          amount,
          description: "Pembayaran sebagian",
          type: TYPE.DEBIT,
          user: user.username,
        });

        const updateInvoice = await Invoice.update(
          {
            amount: invoice.amount - amount,
            user: user.username,
          },
          {
            where: { id: number },
          }
        );
        const updatedInvoice = await Invoice.findOne({ where: { id: number } });

        return res.status(200).json({
          status: true,
          message: "payment success",
          data: {
            remaining: updatedInvoice.amount,
            status: INV_STATUS.PARTIAL,
            maturity_date: invoice.maturity_date,
            transaction: invoice.transactions,
          },
        });
      }else if (amount >= invoice.amount){
        
      }

    } catch (error) {
      next(error);
    }
  },
};
