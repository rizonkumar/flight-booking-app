const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { MESSAGES } = require("../utils/constants");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const response = await cityRepository.create(data);
    return response;
  } catch (error) {
    console.error("error", error);
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      let explanation = error.errors.map((err) => err.message);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      MESSAGES.ERROR.CANNOT_CREATE_CITY,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCities() {
  try {
    const response = await cityRepository.getAll();
    return response;
  } catch (error) {
    logger.error(`Error in getCities service: ${error.message}`);
    logger.error(error.stack);
    throw new AppError(
      MESSAGES.ERROR.UNABLE_TO_FETCH_ALL_CITIES,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateCity(id, data) {
  try {
    const updatedCity = await cityRepository.update(id, data);
    return updatedCity;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(MESSAGES.ERROR.CITY_NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new AppError(
        MESSAGES.ERROR.CITY_NAME_ALREADY_EXISTS,
        StatusCodes.CONFLICT
      );
    }
    throw new AppError(
      MESSAGES.ERROR.UNABLE_TO_UPDATE_CITY,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function deleteCity(id) {
  try {
    const deletedCity = await cityRepository.destroy(id);
    return deletedCity;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(MESSAGES.ERROR.CITY_NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      MESSAGES.ERROR.UNABLE_TO_DELETE_CITY,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { createCity, getCities, updateCity, deleteCity };
