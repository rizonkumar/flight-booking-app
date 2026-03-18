const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { MESSAGES, CONFIG } = require("../utils/constants");

function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    ErrorResponse.message = MESSAGES.ERROR.INVALID_INPUT;
    ErrorResponse.error = new AppError(
      [MESSAGES.ERROR.MODEL_NUMBER_REQUIRED],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (req.body.capacity !== undefined) {
    validateCapacity(req, res, next);
  } else {
    next();
  }
}

function validateUpdateRequest(req, res, next) {
  if (req.body.capacity !== undefined) {
    validateCapacity(req, res, next);
  } else {
    next();
  }
}

function validateCapacity(req, res, next) {
  const capacity = parseInt(req.body.capacity);
  if (isNaN(capacity)) {
    ErrorResponse.message = MESSAGES.ERROR.INVALID_CAPACITY;
    ErrorResponse.error = new AppError(
      ["Capacity must be a number"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (capacity < 0 || capacity > CONFIG.MAX_AIRPLANE_CAPACITY) {
    ErrorResponse.message = MESSAGES.ERROR.INVALID_CAPACITY;
    ErrorResponse.error = new AppError(
      [`Capacity must be between 0 and ${CONFIG.MAX_AIRPLANE_CAPACITY}`],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateRequest,
};
