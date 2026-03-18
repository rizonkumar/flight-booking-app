import axios from "axios";
import type {
  Flight,
  Airport,
  City,
  Booking,
  ApiResponse,
  FlightSearchParams,
} from "./types";

const flightApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FLIGHT_SERVICE_URL || "http://localhost:3000",
});

const bookingApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BOOKING_SERVICE_URL || "http://localhost:3001",
});

export async function getFlights(
  params?: FlightSearchParams
): Promise<Flight[]> {
  const { data } = await flightApi.get<ApiResponse<Flight[]>>(
    "/api/v1/flights",
    { params }
  );
  return data.data;
}

export async function getFlight(id: string): Promise<Flight> {
  const { data } = await flightApi.get<ApiResponse<Flight>>(
    `/api/v1/flights/${id}`
  );
  return data.data;
}

export async function getAirports(): Promise<Airport[]> {
  const { data } = await flightApi.get<ApiResponse<Airport[]>>(
    "/api/v1/airports"
  );
  return data.data;
}

export async function getCities(): Promise<City[]> {
  const { data } = await flightApi.get<ApiResponse<City[]>>("/api/v1/cities");
  return data.data;
}

export async function createBooking(payload: {
  flightId: number;
  userId: number;
  noofSeats: number;
}): Promise<Booking> {
  const { data } = await bookingApi.post<ApiResponse<Booking>>(
    "/api/v1/bookings",
    payload
  );
  return data.data;
}

export async function makePayment(payload: {
  bookingId: number;
  userId: number;
  totalCost: number;
}): Promise<void> {
  await bookingApi.post("/api/v1/bookings/payments", payload);
}
