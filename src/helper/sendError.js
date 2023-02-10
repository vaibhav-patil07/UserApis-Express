const sendError = (err, req, res) => {
  res.status(err.statusCode || 500).json({
    message: err.message,
  });
};

module.exports = sendError;
