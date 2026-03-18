const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { MESSAGES, CONFIG } = require("../utils/constants");

function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = MESSAGES.ERROR.INVALID_INPUT;
    ErrorResponse.error = new AppError(
      [MESSAGES.ERROR.NAME_REQUIRED],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.code) {
    ErrorResponse.message = MESSAGES.ERROR.INVALID_INPUT;
    ErrorResponse.error = new AppError(
      [MESSAGES.ERROR.CITYID_REQUIRED],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.cityId) {
    ErrorResponse.message = MESSAGES.ERROR.INVALID_INPUT;
    ErrorResponse.error = new AppError(
      [MESSAGES.ERROR.AIRPORT_CODE_REQUIRED],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
module.exports = {
  validateCreateRequest,
};
