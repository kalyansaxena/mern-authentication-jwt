const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode ? res.statusCode : 500;
  if (statusCode == 200) {
    statusCode = 400;
  }
  res.status(statusCode);
  return res.json({
    success: false,
    error: err.message,
  });
};

module.exports = {
  errorHandler,
};
