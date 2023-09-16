require("dotenv").config();

const jwt = require("jsonwebtoken");
const { Work_order } = require("../models");
const { WO_STATUS } = require("../utils/enum");
const { JWT_SECRET } = process.env;

module.exports = {
  create: async (req, res, next) => {
    try {
      const { details, customer } = req.body;
      const token = req.headers["authorization"];

      if (!token) {
        return res.status(401).json({
          status: false,
          message: "invalid token",
        });
      }
      const user = jwt.verify(token, JWT_SECRET);

      const newWorkOrder = await Work_order.create({
        applicant: user.username,
        details,
        customer,
        status: WO_STATUS.UNPROCESSED,
      });

      return res.status(200).json({
        status: true,
        message: "Work Order created successfully!",
        data: {
          applicant: newWorkOrder.applicant,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const workOrders = await Work_order.findAll();

      if (!workOrders.length) {
        return res.status(200).json({
          status: false,
          message: "empty data",
          data: workOrders,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success get all Work Orders",
        data: workOrders,
      });
    } catch (error) {
      next(err);
    }
  },
};
