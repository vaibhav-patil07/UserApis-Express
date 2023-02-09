const fs = require("fs");
class FileHandler {
  static readFileAsync(path, encoding) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, encoding, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    }).then((data) => {
      return new Promise((resolve, reject) => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  static writeFileAsync(path, encoding, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, encoding, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }
}

module.exports = FileHandler;
