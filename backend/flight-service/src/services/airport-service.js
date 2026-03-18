const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { MESSAGES, CONFIG } = require("../utils/constants");

const airportRepository = new AirportRepository();

async function createAirport(data) {
  console.log("data", data);
  try {
    const airport = await airportRepository.create(data);
    return airport;
  } catch (error) {
    console.log("error", error);
    if (error.name === "SequelizeValidationError") {
      let explanation = error.errors.map((err) => err.message);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      MESSAGES.ERROR.AIRPORT_CREATE_FAILED,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirports() {
  try {
    const airport = await airportRepository.getAll();
    return airport;
  } catch (error) {
    throw new AppError(
      MESSAGES.ERROR.UNABLE_TO_FETCH_ALL_AIRPORTS,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        MESSAGES.ERROR.AIRPORT_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      MESSAGES.ERROR.UNABLE_TO_FETCH_AIRPLANE,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteAirport(id) {
  try {
    const airport = await airportRepository.destroy(id);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        MESSAGES.ERROR.AIRPORT_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      MESSAGES.ERROR.UNABLE_TO_FETCH_AIRPORT,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  deleteAirport,
};
