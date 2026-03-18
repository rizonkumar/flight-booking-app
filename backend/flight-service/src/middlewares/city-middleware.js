const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { MESSAGES, CONFIG } = require("../utils/constants");

function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = MESSAGES.ERROR.INVALID_INPUT;
    ErrorResponse.error = new AppError(
      [MESSAGES.ERROR.CITY_NAME_REQUIRED],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

function validateUpdateRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = MESSAGES.ERROR.INVALID_INPUT;
    ErrorResponse.error = new AppError(
      [MESSAGES.ERROR.CITY_NAME_REQUIRED],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = { validateCreateRequest, validateUpdateRequest };
