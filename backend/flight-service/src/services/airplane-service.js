const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { MESSAGES, CONFIG } = require("../utils/constants");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      let explanation = error.errors.map((err) => err.message);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      MESSAGES.ERROR.AIRPLANE_CREATE_FAILED,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplanes() {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      MESSAGES.ERROR.UNABLE_TO_FETCH_ALL_AIRPLANES,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplane(id) {
  try {
    const airplane = await airplaneRepository.get(id);
    return airplane;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        MESSAGES.ERROR.AIRPLANE_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      MESSAGES.ERROR.UNABLE_TO_FETCH_AIRPLANE,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteAirplane(id) {
  try {
    const airplane = await airplaneRepository.destroy(id);
    return airplane;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        MESSAGES.ERROR.AIRPLANE_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      MESSAGES.ERROR.UNABLE_TO_FETCH_AIRPLANE,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirplane(data, id) {
  try {
    // Validate capacity
    if (data.capacity !== undefined) {
      const capacity = parseInt(data.capacity);
      if (isNaN(capacity) || capacity < 0) {
        throw new AppError(
          MESSAGES.ERROR.INVALID_CAPACITY,
          StatusCodes.BAD_REQUEST
        );
      }
      if (capacity > CONFIG.MAX_AIRPLANE_CAPACITY) {
        throw new AppError(
          MESSAGES.ERROR.CAPACITY_EXCEEDED,
          StatusCodes.BAD_REQUEST
        );
      }
    }

    // Update the airplane
    const updatedAirplane = await airplaneRepository.update(id, data);
    return updatedAirplane;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      MESSAGES.ERROR.UNABLE_TO_UPDATE_AIRPLANE,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  deleteAirplane,
  updateAirplane,
};
