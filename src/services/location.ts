import axios from "axios";
import { Location } from "@/shared/types";

export const locationService = {
  async getUsersSavedLocations(): Promise<any> {
    const savedLocations = localStorage.getItem("weather-location-list");
    if (savedLocations) return JSON.parse(savedLocations);
    return null;
  },

  updateUsersLocations(locations: Array<Location>): void {
    localStorage.setItem("weather-location-list", JSON.stringify(locations));
  },

  requestPermissionToDetectUsersLocation(): Promise<any> {
    return new Promise((result) => {
      navigator.geolocation.getCurrentPosition(result);
    });
  },

  async fetchUserLocation() {
    try {
      return await axios.get(`https://ipinfo.io/json?token=${process.env.VUE_APP_LOCATION_API_KEY}`)
        .then((response) => {
          return response.data
        })
        .catch((error) => error)
    } catch (error) {
      console.error(error);
    }
  }
}