import { Location } from "@/shared/types";

export const locationService = {
  async getUsersSavedLocations(): Promise<any> {
    const savedLocations = localStorage.getItem("weather-location-list");
    if (savedLocations) return JSON.parse(savedLocations);
    return null;
  },

  updateUserLocations(locations: Array<Location>): void {
    localStorage.setItem("weather-location-list", JSON.stringify(locations));
  },

  requestUserLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
}