import axios from "axios";
import { Weather, Location, Coordinates } from "@/shared/types";
import { v4 as uuidv4 } from "uuid";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

export const weatherService = {
  async fetchWeatherDataByLocation(payload: Location): Promise<any> {
    const { city, country } = payload;
    try {
      return await axios.get(BASE_URL, {
        params: {
          q: `${city},${country}`,
          units: "metric",
          appid: process.env.VUE_APP_WEATHER_API_KEY
        }
      })
        .then((response) => {
          return processWeatherApiResponse(response.data);
        })
        .catch((error) => error)
    } catch (error) {
      console.error(error);
    }
  },

  async fetchWeatherDataByCoordinates(payload: Coordinates) {
    const { latitude, longitude } = payload;

    try {
      return await axios.get(BASE_URL, {
        params: {
          lat: latitude,
          lon: longitude,
          units: "metric",
          appid: process.env.VUE_APP_WEATHER_API_KEY
        }
      })
        .then((response) => {
          return processWeatherApiResponse(response.data);
        })
        .catch((error) => error)
    } catch (error) {
      console.error(error);
    }
  }
}

function processWeatherApiResponse(data: any): Weather {
  const result: Weather = {
    id: uuidv4(),
    city: data.name,
    country: data.sys.country,
    main: data.weather[0].main,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    temp: data.main.temp,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed
  };

  return result;
}