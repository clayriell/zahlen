require("dotenv").config();

const jwt = require("jsonwebtoken");
const { WorkOrder_details, Work_order } = require("../models");
const { JWT_SECRET } = process.env;

module.exports = {
  create: async (req, res, next) => {
    try {
      const { wo_id } = req.params;
      const { account_code, amount, description } = req.body;
      const token = req.headers["authorization"];

      if (!token) {
        return res.status(401).json({
          status: false,
          message: "invalid token",
        });
      }
      const user = jwt.verify(token, JWT_SECRET);

      const WO_detail = await WorkOrder_details.create({
        wo_id,
        account_code,
        amount,
        description,
        user: user.username,
      });

      return res.status(200).json({
        status: true,
        message: "details added!",
        data: WO_detail,
      });
    } catch (error) {
      next(error);
    }
  },

  getByWoId: async (req, res, next) => {
    try {
      const { wo_id } = req.params;
      const WoDetail = await WorkOrder_details.findAll({ where: { wo_id } });
      const WorkOrder = await Work_order.findOne({ where: { id: wo_id } });
      if (!WorkOrder) {
        return res.status(200).json({
          status: false,
          message: "Work Order doesn't exist",
          data: WorkOrder,
        });
      }
      if (!WoDetail.length) {
        return res.status(200).json({
          status: false,
          message: "Add Detail",
          data: WoDetail,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success get work order details!",
        data: WoDetail,
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { account_code, amount, description } = req.body;
      const token  = req.headers["authorization"];
      const WoDetail = await WorkOrder_details.findOne({ where: { id } });

      if (!WoDetail) {
        return res.status(200).json({
          status: false,
          message: "item not found",
          data: WoDetail,
        });
      }
      const user = jwt.verify(token, JWT_SECRET);

      const updateDetail = await WorkOrder_details.update(
        { account_code, amount, description, user: user.username },
        { where: { id } }
      );

      const updatedDetail = await WorkOrder_details.findOne({ where: { id } });
      return res.status(200).json({
        status: true,
        message: "item updated",
        data: updatedDetail,
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const deleteDetail = await WorkOrder_details.destroy({ where: { id } });

      return res.status(200).json({
        status: true,
        message: "item deleted",
        data: deleteDetail,
      });
    } catch (error) {
      next(error);
    }
  },
};
