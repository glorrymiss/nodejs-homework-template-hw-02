const isAuthenticate = require("../middlewares/isAuthenticate");
const isValidId = require("../middlewares/isValidId");
const validateBody = require("../middlewares/validateBody");

module.exports = {
  isAuthenticate,
  isValidId,
  validateBody,
};
