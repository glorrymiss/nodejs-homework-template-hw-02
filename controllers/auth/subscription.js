const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const subscription = async (req, res) => {
  const { id } = req.params;

  const updateStatus = await User.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  console.log(id);
  if (!updateStatus) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(updateStatus);
};

module.exports = subscription;
