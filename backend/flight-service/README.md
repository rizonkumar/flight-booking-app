
# Flight Booking App

This is a Flight Booking Application built with Node.js, Express, and Sequelize ORM.

## Table of Contents

- [Setup](#setup)
- [Database Configuration](#database-configuration)
- [API Endpoints](#api-endpoints)
  - [Airplane Routes](#airplane-routes)
  - [City Routes](#city-routes)
  - [Info Route](#info-route)
- [Models and Migrations](#models-and-migrations)
- [Error Handling](#error-handling)
- [Logging](#logging)

## Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables in a `.env` file (see `.env.example` for required variables).
4. Start the server:
   ```bash
   npm run dev
   ```

## Database Configuration

The project uses MySQL as the database. Configure your database settings in `config/config.json`. Make sure to set up your development, test, and production environments accordingly.

## API Endpoints

### Airplane Routes

#### Create Airplane

- **POST** `/api/v1/airplanes`
- **Request Body:**

  ```json
  {
    "modelNumber": "Boeing 737",
    "capacity": 180
  }
  ```

- **Response:**
  ```json
  {
    "success": true,
    "message": "Airplane created successfully",
    "data": {
      "id": 1,
      "modelNumber": "Boeing 737",
      "capacity": 180,
      "createdAt": "2024-10-19T12:00:00.000Z",
      "updatedAt": "2024-10-19T12:00:00.000Z"
    },
    "error": {}
  }
  ```

#### Get All Airplanes

- **GET** `/api/v1/airplanes`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Airplane fetched successfully",
    "data": [
      {
        "id": 1,
        "modelNumber": "Boeing 737",
        "capacity": 180,
        "createdAt": "2024-10-19T12:00:00.000Z",
        "updatedAt": "2024-10-19T12:00:00.000Z"
      }
    ],
    "error": {}
  }
  ```

#### Get Airplane by ID

- **GET** `/api/v1/airplanes/:id`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Airplane fetched successfully",
    "data": {
      "id": 1,
      "modelNumber": "Boeing 737",
      "capacity": 180,
      "createdAt": "2024-10-19T12:00:00.000Z",
      "updatedAt": "2024-10-19T12:00:00.000Z"
    },
    "error": {}
  }
  ```

#### Update Airplane

- **PATCH** `/api/v1/airplanes/:id`
- **Request Body:**
  ```json
  {
    "capacity": 200
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Airplane updated successfully",
    "data": {
      "id": 1,
      "modelNumber": "Boeing 737",
      "capacity": 200,
      "createdAt": "2024-10-19T12:00:00.000Z",
      "updatedAt": "2024-10-19T12:30:00.000Z"
    },
    "error": {}
  }
  ```

#### Delete Airplane

- **DELETE** `/api/v1/airplanes/:id`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Airplane deleted successfully",
    "data": 1,
    "error": {}
  }
  ```

### City Routes

#### Create City

- **POST** `/api/v1/cities`
- **Request Body:**
  ```json
  {
    "name": "New York"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "City created successfully",
    "data": {
      "id": 1,
      "name": "New York",
      "createdAt": "2024-10-19T12:00:00.000Z",
      "updatedAt": "2024-10-19T12:00:00.000Z"
    },
    "error": {}
  }
  ```

#### Get All Cities

- **GET** `/api/v1/cities`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Cities fetched successfully",
    "data": [
      {
        "id": 1,
        "name": "New York",
        "createdAt": "2024-10-19T12:00:00.000Z",
        "updatedAt": "2024-10-19T12:00:00.000Z"
      }
    ],
    "error": {}
  }
  ```

#### Get City by ID

- **GET** `/api/v1/cities/:id`
- **Response:**
  ```json
  {
    "success": true,
    "message": "City fetched successfully",
    "data": {
      "id": 1,
      "name": "New York",
      "createdAt": "2024-10-19T12:00:00.000Z",
      "updatedAt": "2024-10-19T12:00:00.000Z"
    },
    "error": {}
  }
  ```

#### Update City

- **PATCH** `/api/v1/cities/:id`
- **Request Body:**
  ```json
  {
    "name": "Updated City Name"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "City updated successfully",
    "data": {
      "id": 1,
      "name": "Updated City Name",
      "createdAt": "2024-10-19T12:00:00.000Z",
      "updatedAt": "2024-10-19T12:30:00.000Z"
    },
    "error": {}
  }
  ```

#### Delete City

- **DELETE** `/api/v1/cities/:id`
- **Response:**
  ```json
  {
    "success": true,
    "message": "City deleted successfully",
    "data": 1,
    "error": {}
  }
  ```

### Info Route

#### Get API Info

- **GET** `/api/v1/info`
- **Response:**
  ```json
  {
    "success": true,
    "message": "API is live and operational",
    "error": {},
    "data": {}
  }
  ```

## Models and Migrations

### Airplane Model

To generate the Airplane model and migration:

```bash
npx sequelize-cli model:generate --name Airplane --attributes modelNumber:string,capacity:integer
```

### City Model

To generate the City model and migration:

```bash
npx sequelize-cli model:generate --name City --attributes name:string
```

### Running Migrations

To run migrations:

```bash
npx sequelize-cli db:migrate
```

To generate a migration for updating the city-airport association:

```bash
npx sequelize migration:generate --name update-city-airport-association
```

## Error Handling

The application uses custom error handling with the `AppError` class and standardized error responses. Errors are logged, and appropriate HTTP status codes are sent in the responses.

## Logging

Logging is configured using Winston. Logs are written to both the console and a `combined.log` file.
