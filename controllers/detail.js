require("dotenv").config();

const jwt = require("jsonwebtoken");
const { Work_order, Account_list, User, Detail } = require("../models");
const { DETAILS_STATUS } = require("../utils/enum");
const { JWT_SECRET } = process.env;

module.exports = {
  addByWO: async (req, res, next) => {
    try {
      const { wo_id } = req.params;
      const { account_code, amount, description, type } = req.body;
      const token = req.headers["authorization"];

      const WoExist = await Work_order.findOne({ where: { id: wo_id } });
      if (!WoExist) {
        return res.status(200).json({
          status: false,
          message: "Work Order doesn't exist",
          data: WoExist,
        });
      }

      if (!token) {
        return res.status(401).json({
          status: false,
          message: "invalid token",
        });
      }
      const user = jwt.verify(token, JWT_SECRET);
      // const account_number = await Account_list.findOne({where : {code : account_code}})
      // if (!account_number){
      //   return res.status(200).json({
      //     stauts : false, message : "account_code doesn't exist", data : account_number
      //   })
      // }
      const detail = await Detail.create({
        category: null,
        account_code,
        amount: parseFloat(amount),
        description,
        type,
        user: user.username,
        status: DETAILS_STATUS.WO,
        wo_id: parseInt(wo_id),
        transaction_id: null,
      });

      const sumDetail = await Detail.sum("amount", { where: { wo_id } });
      const workOrder = await Work_order.update(
        { amount: sumDetail },
        { where: { id: wo_id } }
      );

      return res.status(200).json({
        status: true,
        message: "details added!",
        data: detail,
      });
    } catch (error) {
      next(error);
    }
  },

  getByWoId: async (req, res, next) => {
    try {
      const { wo_id } = req.params;
      const detail = await Detail.findAll({
        include: [
          {
            model: Account_list,
            as: "account",
            attributes: ["id", "name"],
          },
        ],
        where: { wo_id },
      });

      const WorkOrder = await Work_order.findOne({ where: { id: wo_id } });
      if (!WorkOrder) {
        return res.status(200).json({
          status: false,
          message: "Work Order doesn't exist",
          data: WorkOrder,
        });
      }

      if (!detail.length) {
        return res.status(200).json({
          status: false,
          message: "Add Detail",
          data: detail,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success get work order details!",
        data: detail,
      });
    } catch (error) {
      next(error);
    }
  },

  //need to fix
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { account_code, amount, description } = req.body;
      const token = req.headers["authorization"];
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
      const updateWO = await Work_order.update({
        status: WO_STATUS.IN_PROCESS,
      });

      const updatedDetail = await WorkOrder_details.findOne({ where: { id } });
      return res.status(201).json({
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

      const detail = await Detail.findOne({ where: { id } });
      if (!detail) {
        return res.status(200).json({
          status: false,
          message: "detail not found",
          data: detail,
        });
      }
      const deleteDetail = await Detail.destroy({ where: { id } });
      const sumAmount = await Detail.sum("amount", {
        where: { wo_id: detail.wo_id },
      });
      const updateAmount = await Work_order.update(
        { amount: sumAmount },
        { where: { id: detail.wo_id } }
      );
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
