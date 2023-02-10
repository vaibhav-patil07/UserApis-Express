const User = require("../model/User");
const FileHandler = require("../utility/FileHandler");
const sendResponse = require("../helper/sendResponse");
const sendError = require("../helper/sendError");
const AppError = require("../helper/AppError");

let latestUserId = 13;
const UserFilePath = "./data/Users.json";

const getAllUsers = (req, res) => {
  FileHandler.readFileAsync(UserFilePath, "utf-8")
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
  FileHandler.readFileAsync(UserFilePath, "utf-8")
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

const validateUser = (req, res, next) => {
  const { body } = req;
  const isValid = User.prototype.keys.every((keys) =>
    Object.keys(body).includes(keys)
  );
  if (!isValid) {
    return sendError(
      new AppError({ message: "Invalid request body", statusCode: 400 }),
      req,
      res
    );
  }
  next();
};

const createUser = (req, res) => {
  const { body } = req;
  const userData = new User(body);
  latestUserId++;
  userData.id = latestUserId.toString();
  const readPromise = FileHandler.readFileAsync(UserFilePath, "utf-8");

  const writePromise = readPromise
    .then((data) => {
      const Users = [...data];
      Users.push(userData);
      return FileHandler.writeFileAsync(UserFilePath, "utf-8", Users);
    })
    .catch((err) => {
      return sendError(
        new AppError({ message: err, statusCode: 500 }),
        req,
        res
      );
    });

  writePromise
    .then((data) => {
      return sendResponse(req, res, {
        message: "User created successfully",
        payload: userData,
      });
    })
    .catch((err) => {
      return sendError(
        new AppError({ message: err, statusCode: 500 }),
        req,
        res
      );
    });
};

const deleteUser = (req, res) => {
  const {
    params: { id },
  } = req;
  FileHandler.readFileAsync(UserFilePath, "utf-8")
    .then((data) => {
      const result = data.findIndex((user) => user.id === id);
      if (result === -1) {
        return sendError(
          new AppError({ message: "User not found", statusCode: 404 }),
          req,
          res
        );
      }
      const deletedUser = data.splice(result, 1);
      FileHandler.writeFileAsync(UserFilePath, "utf-8", data)
        .then((data) => {
          return sendResponse(req, res, {
            message: "User deleted successfully",
            payload: deletedUser,
          });
        })
        .catch((err) => {
          return sendError(
            new AppError({ message: err, statusCode: 500 }),
            req,
            res
          );
        });
    })
    .catch((err) => {
      sendError(new AppError({ message: err, statusCode: 500 }), req, res);
    });
};

const updateUser = (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const userData = new User(body);
  userData.id = id;

  const writePromise = FileHandler.readFileAsync(UserFilePath, "utf-8")
    .then((data) => {
      let result = data.find((user) => user.id === id);
      if (!result) {
        return sendError(
          new AppError({ message: "User not found", statusCode: 404 }),
          req,
          res
        );
      }
      result = userData;
      return FileHandler.writeFileAsync(UserFilePath, "utf-8", data);
    })
    .catch((err) => {
      sendError(new AppError({ message: err, statusCode: 500 }), req, res);
    });

  writePromise
    .then((data) => {
      return sendResponse(req, res, {
        message: "User updated successfully",
        payload: userData,
      });
    })
    .catch((err) => {
      return sendError(
        new AppError({ message: err, statusCode: 500 }),
        req,
        res
      );
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  validateUser,
  createUser,
  deleteUser,
  updateUser,
};
