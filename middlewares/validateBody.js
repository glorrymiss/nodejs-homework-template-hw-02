const { HttpError } = require("../helpers");

const validateBody = (scheme) => {
  const func = (req, res, next) => {
    const { error } = scheme.validate(req.body);
    if (error) {
      next(HttpError(400, "missing required name field"));
    }
    next();
  };
  return func;
};

const validateUpdateBody = (scheme) => {
  const func = (req, res, next) => {
    if (!req.body) {
      next(HttpError(400, "missing fields"));
    }
    const { error } = scheme.validate(req.body);
    if (error) {
      next(
        HttpError(
          400,
          `missing required  ${error.message.split(" ").splice(0, 1)} field`
        )
      );
    }
    next();
  };
  return func;
};

module.exports = { validateBody, validateUpdateBody };
