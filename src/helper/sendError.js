const sendError = (err, req, res) => {
  res.status(err.statusCode).json({
    message: err.message,
  });
};

module.exports = sendError;
