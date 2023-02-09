const User = require("../model/User");
const FileHandler = require("../utility/FileHandler");
const sendResponse = require("../helper/sendResponse");
const sendError = require("../helper/sendError");
const AppError = require("../helper/AppError");

const getAllUsers = (req, res) => {
  FileHandler.readFileAsync("./data/Users.json", "utf-8")
    .then((data) => {
      sendResponse(req, res, {
        message: "Users fetched successfully",
        payload: data,
      });
    })
    .catch((err) => {
      sendError(new AppError({ message: err, statusCode: 500 }), req, res);
    });
};

const getUserById = (req, res) => {
  const {
    params: { id },
  } = req;
  FileHandler.readFileAsync("./data/Users.json", "utf-8")
    .then((data) => {
      const result = data.find((user) => user.id === id);
      if (!result) {
        return sendError(
          new AppError({ message: "User not found", statusCode: 404 }),
          req,
          res
        );
      }
      return sendResponse(req, res, {
        message: "User fetched successfully",
        payload: result,
      });
    })
    .catch((err) => {
      sendError(new AppError({ message: err, statusCode: 500 }), req, res);
    });
};

module.exports = {
  getAllUsers,
  getUserById,
};
