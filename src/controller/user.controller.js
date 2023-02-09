const User = require("../model/User");
const FileHandler = require("../utility/FileHandler");
const sendResponse = require("../helper/sendResponse");
const sendError = require("../helper/sendError");
const AppError = require("../helper/AppError");

const getAllUsers = (req, res) => {
  FileHandler.readFileAsync("./data/Users.json", "utf-8")
    .then((data) => {
      sendResponse(req, res, data);
    })
    .catch((err) => {
      sendError(new AppError({ message: err, statusCode: 500 }));
    });
};

module.exports = {
  getAllUsers,
};
