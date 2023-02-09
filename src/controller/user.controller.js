const User = require("../model/User");
const FileHandler = require("../utility/FileHandler");

const getAllUsers = (req,res) => {
  FileHandler.readFileAsync("./data/Users.json", "utf-8")
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

getAllUsers();
