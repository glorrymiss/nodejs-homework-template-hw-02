const { isValidOdjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidOdjectId(id)) {
    next(HttpError(400, `${id} is not id`));
  }
  next();
};

module.exports = isValidId;
