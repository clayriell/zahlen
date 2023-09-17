require("dotenv").config();

const jwt = require("jsonwebtoken");
const { Work_order, Invoice, User } = require("../models");
const { WO_STATUS, INV_STATUS } = require("../utils/enum");
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

  //not fixed yet
  getByStatus: async (req, res, next) => {
    try {
      const { status } = req.params;
      const workOrders = await Work_order.findAll({ where: { status } });

      if (!workOrders.length) {
        return res.status(200).json({
          status: false,
          message: "No Work Orders found!",
          data: workOrders,
        });
      }

      return res.status(200).json({
        status: true,
        message: "Success get processed Work Orders",
        data: workOrders,
      });
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const workOrder = await Work_order.findOne({ where: { id } });

      if (!workOrder) {
        return res.status(200).json({
          status: false,
          message: "Work Order not found",
          data: workOrder,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success get work order data",
        data: workOrder,
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { details, customer } = req.body;

      const workOrder = await Work_order.findOne({ where: { id } });

      if (!workOrder) {
        return req.status(200).json({
          status: false,
          message: "Work Order not found",
          data: workOrder,
        });
      }

      const updateWO = await Work_order.update(
        { details, customer },
        { where: { id } }
      );

      const updatedWO = await Work_order.findOne({ where: { id } });

      return res.status(201).json({
        status: true,
        message: "Work Order updated successfully",
        data: updatedWO,
      });
    } catch (error) {
      next(error);
    }
  },

  // no done yet // amount
  submit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const token = req.headers["authorization"];
      const { number, maturity_date } = req.body;

      const invoice = await Invoice.findOne({ where: { id: number } });
      if (invoice) {
        return res.status(200).json({
          status: false,
          message: "invoice number already used",
          data: invoice,
        });
      }
      const workOrder = await Work_order.findOne({ where: { id } });

      if (!workOrder) {
        return res.status(200).json({
          status: false,
          message: "Work Order no found!",
          data: workOrder,
        });
      }
      if (workOrder.status == WO_STATUS.PROCESSED) {
        return res.status(200).json({
          status: false,
          message: "Work order already submitted, please check the invoice",
          data: workOrder,
        });
      }
      const user = jwt.verify(token, JWT_SECRET);

      const createInvoice = await Invoice.create({
        id: number,
        customer: workOrder.customer,
        ref: `WO/SCP/${id}`,
        note: workOrder.details,
        status: INV_STATUS.UNPAID,
        user: user.username,
        is_paid: false,
        maturity_date,
        paid_date: null,
        amount: 0,
      });
      const updateWO = await Work_order.update(
        { status: WO_STATUS.PROCESSED, submitted_by: user.username },
        { where: { id } }
      );

      return res.status(200).json({
        status: true,
        message: "Invoice created!",
        data: createInvoice,
      });
    } catch (error) {
      next(error);
    }
  },
};
