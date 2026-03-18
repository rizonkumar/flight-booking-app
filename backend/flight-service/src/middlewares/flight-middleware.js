const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { MESSAGES, CONFIG } = require("../utils/constants");

function validateCreateRequest(req, res, next) {
  if (!req.body.flightNumber) {
    ErrorResponse.message = MESSAGES.ERROR.INVALID_INPUT;
    ErrorResponse.error = new AppError(
      [MESSAGES.ERROR.FLIGHT_NUMBER_REQUIRED],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.airplaneId) {
    ErrorResponse.message = MESSAGES.ERROR.INVALID_INPUT;
    ErrorResponse.error = new AppError(
      [MESSAGES.ERROR.AIRPLANE_ID_REQUIRED],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.departureAirportId) {
    ErrorResponse.message = MESSAGES.ERROR.INVALID_INPUT;
    ErrorResponse.error = new AppError(
      [MESSAGES.ERROR.DEPARTURE_AIRPORT_CODE_REQUIRED],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.arrivalAirportId) {
    ErrorResponse.message = MESSAGES.ERROR.INVALID_INPUT;
    ErrorResponse.error = new AppError(
      [MESSAGES.ERROR.ARRIVAL_AIRPORT_CODE_REQUIRED],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.arrivalTime) {
    ErrorResponse.message = MESSAGES.ERROR.INVALID_INPUT;
    ErrorResponse.error = new AppError(
      [MESSAGES.ERROR.ARRIVAL_TIME_REQUIRED],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.departureTime) {
    ErrorResponse.message = MESSAGES.ERROR.INVALID_INPUT;
    ErrorResponse.error = new AppError(
      [MESSAGES.ERROR.DEPARTURE_TIME_REQUIRED],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.price) {
    ErrorResponse.message = MESSAGES.ERROR.INVALID_INPUT;
    ErrorResponse.error = new AppError(
      [MESSAGES.ERROR.PRICE_REQUIRED],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.totalSeats) {
    ErrorResponse.message = MESSAGES.ERROR.INVALID_INPUT;
    ErrorResponse.error = new AppError(
      [MESSAGES.ERROR.TOTAL_SEATS_REQUIRED],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

function validateUpdateSeatsRequest(req, res, next) {
  if (!req.body.seats) {
    ErrorResponse.message = MESSAGES.ERROR.INVALID_INPUT;
    ErrorResponse.error = new AppError(
      [MESSAGES.ERROR.SEATS_REQUIRED],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
module.exports = {
  validateCreateRequest,
  validateUpdateSeatsRequest,
};
