import axios from "axios";
import { Weather, Location } from "@/shared/types";
import { v4 as uuidv4 } from "uuid";

export const weatherService = {
  async fetchWeatherData(payload: Location): Promise<any> {
    const { city, country } = payload;
    try {
      return await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${process.env.VUE_APP_WEATHER_API_KEY}`)
        .then((response: any) => {
          const result: Weather = {
            id: uuidv4(),
            city: response.data.name,
            country: response.data.sys.country,
            main: response.data.weather[0].main,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            temp: response.data.main.temp,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed
          };

          return result;
        })
        .catch((error) => error)
    } catch (error) {
      console.error(error);
    }
  },
}