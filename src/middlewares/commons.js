const { validationResult } = require("express-validator");
const AppError = require("../errors/appErrors");

const validationRes = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(`Validation Error: `, 400, errors.errors);
  }
  next();
};

module.exports = { validationRes };
