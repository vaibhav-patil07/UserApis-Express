const User = require("../model/User");
const FileHandler = require("../utility/FileHandler");
const sendResponse = require("../helper/sendResponse");
const sendError = require("../helper/sendError");
const AppError = require("../helper/AppError");

let latestUserId = 13;
const UserFilePath = "./data/Users.json";

const getAllUsers = (req, res) => {
  //Promise for reading file
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
  //get user id from params
  const {
    params: { id },
  } = req;

  //Promise for reading file
  FileHandler.readFileAsync(UserFilePath, "utf-8")
    .then((data) => {
      const result = data.find((user) => user.id === id);
      //If user not found
      if (!result) {
        return sendError(
          new AppError({ message: "User not found", statusCode: 404 }),
          req,
          res
        );
      }
      //If user data found
      return sendResponse(req, res, {
        message: "User fetched successfully",
        payload: result,
      });
    })
    .catch((err) => {
      //Error handling for reading file
      sendError(new AppError({ message: err, statusCode: 500 }), req, res);
    });
};

const validateUser = (req, res, next) => {
  const { body } = req;
  const isValid = User.prototype.keys.every((keys) =>
    Object.keys(body).includes(keys)
  );
  //If request body is invalid
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
  //validateUser -> next -> createUser

  const { body } = req;
  const userData = new User(body);

  //Increament user id
  latestUserId++;
  userData.id = latestUserId.toString(); //Assign id

  //Read promise
  const readPromise = FileHandler.readFileAsync(UserFilePath, "utf-8");

  //Write Promise
  const writePromise = readPromise
    .then((data) => {
      const Users = [...data];
      Users.push(userData);
      //After successful read return write promise
      return FileHandler.writeFileAsync(UserFilePath, "utf-8", Users);
    })
    .catch((err) => {
      //Error handling for read operation
      return sendError(
        new AppError({ message: err, statusCode: 500 }),
        req,
        res
      );
    });

  writePromise
    .then((data) => {
      //After successful write send response
      return sendResponse(req, res, {
        message: "User created successfully",
        payload: userData,
      });
    })
    //Error handling for write operation
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
  //Read promise
  FileHandler.readFileAsync(UserFilePath, "utf-8")
    .then((data) => {
      //Check if user with id exists
      const result = data.findIndex((user) => user.id === id);
      if (result === -1) {
        //If user not found
        return sendError(
          new AppError({ message: "User not found", statusCode: 404 }),
          req,
          res
        );
      }

      //If user found for id delete and write
      const deletedUser = data.splice(result, 1);

      FileHandler.writeFileAsync(UserFilePath, "utf-8", data)
        .then((data) => {
          //Response for deleted user
          return sendResponse(req, res, {
            message: "User deleted successfully",
            payload: deletedUser,
          });
        })
        .catch((err) => {
          //Error handling for write
          return sendError(
            new AppError({ message: err, statusCode: 500 }),
            req,
            res
          );
        });
    })
    .catch((err) => {
      //Error handling for read
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

  //write promise
  const writePromise = FileHandler.readFileAsync(UserFilePath, "utf-8")
    .then((data) => {
      let result = data.find((user) => user.id === id);
      if (!result) {
        //User not found for id
        return sendError(
          new AppError({ message: "User not found", statusCode: 404 }),
          req,
          res
        );
      }

      //if user found update its data
      result = userData;

      //return write promise
      return FileHandler.writeFileAsync(UserFilePath, "utf-8", data);
    })
    .catch((err) => {
      //Error handling for read operation
      sendError(new AppError({ message: err, statusCode: 500 }), req, res);
    });

  writePromise
    .then((data) => {
      //After successful write return updated user data
      return sendResponse(req, res, {
        message: "User updated successfully",
        payload: userData,
      });
    })
    .catch((err) => {
      //Error handling for write operation
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
