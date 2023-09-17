require("dotenv").config();
const { User, Work_order } = require("../models");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const { JWT_SECRET } = process.env;

module.exports = {
  register: async (req, res, next) => {
    try {
      const { username, email, password, role } = req.body;

      if (password.length < 8) {
        return res.status(400).json({
          status: false,
          message: "At least password has 8 character",
        });
      }

      // Check User
      const userExist = await User.findOne({ where: { id: username } });
      if (userExist) {
        return res.status(409).json({
          status: false,
          message: "username already exist!",
          data: null,
        });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);
      const token = crypto.randomBytes(30).toString("hex");
      const newUser = await User.create({
        id: username,
        email,
        password: encryptedPassword,
        role,
      });

      return res.status(200).json({
        status: true,
        message: "Register success!",
        data: {
          username: newUser.id,
          email: newUser.email,
          password: newUser.password,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ where: { id: username } });
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "username not found!",
          data: null,
        });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({
          status: false,
          message: "password doesnt match!",
          data: null,
        });
      }

      const payload = {
        username: user.id,
        role: user.role,
      };
      const token = jwt.sign(payload, JWT_SECRET);

      return res.status(200).json({
        status: true,
        message: "login successful!",
        data: {
          username: user.id,
          role: user.role,
          token: token,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const user = await User.findAll({
        include: [
          {
            model: Work_order,
            as: "work_orders",
            attributes: ["id", "details", "ammount"],
          },
        ],
      });

      if (!user.length) {
        return res.status(200).json({
          status: false,
          message: "empty data",
          data: user,
        });
      }

      return res.status(200).json({
        status: true,
        message: "Get data success!",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      const { password, confirm_new_password } = req.body;

      if (!token)
        return res.status(401).json({
          status: false,
          message: "invalid token",
        });

      if (password.length < 8) {
        return res.status(400).json({
          status: false,
          message: "At least password has 8 character!",
        });
      }

      if (password != confirm_new_password)
        return res.status(400).json({
          status: false,
          message: "password doesn't match!",
        });

      const payload = jwt.verify(token, JWT_SECRET);
      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = await User.update(
        { password: encryptedPassword },
        { where: { id: payload.username } }
      );

      return res.status(200).json({
        status: true,
        message: "Update password success!",
      });
    } catch (err) {
      console.log(err);
    }
  },
  search: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || "";
      const offset = limit * page;
      const totalRows = await User.count({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              email: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limit);
      const result = await User.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              email: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
        offset: offset,
        limit: limit,
        order: [["id", "DESC"]],
      });
      res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage,
      });
    } catch (error) {
      next(error);
    }
  },
};
