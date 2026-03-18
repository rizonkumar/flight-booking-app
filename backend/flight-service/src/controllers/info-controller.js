const { StatusCodes } = require("http-status-codes");
const { MESSAGES } = require("../utils/constants");

const info = (req, res) => {
  return res.status(StatusCodes.OK).json({
    success: true,
    message: MESSAGES.SUCCESS.API_LIVE,
    error: {},
    data: {},
  });
};

module.exports = {
  info,
};
