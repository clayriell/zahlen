require("dotenv").config();

const jwt = require("jsonwebtoken");
const { Invoice, User, Detail, Work_order } = require("../models");
const { WO_STATUS } = require("../utils/enum");
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
};
