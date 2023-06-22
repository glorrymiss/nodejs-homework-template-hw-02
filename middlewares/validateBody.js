const { HttpError } = require("../helpers");

const validateBody = (scheme) => {
  const func = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    }
    const { error } = scheme.validate(req.body);
    if (error) {
      next(
        HttpError(
          400,
          `missing required ${error.message.split(" ").splice(0, 1)} field`
        )
      );
    }
    next();
  };
  return func;
};

module.exports = validateBody;
