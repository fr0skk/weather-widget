import { ActionTree } from "vuex";
import { RootState } from "../types";
import { Weather, Location, Coordinates } from "@/shared/types";
import { WeatherState } from "./types";
import { WeatherMutations } from "./mutations";
import { WeatherGetters } from "./getters";
import { weatherService } from "@/services/weather";
import { locationService } from "@/services/location";

export const actions: ActionTree<WeatherState, RootState> = {
  async getWeatherByLocation({ commit, dispatch }, payload: Location): Promise<any> {
    await weatherService.fetchWeatherDataByLocation(payload)
      .then((response) => {
        commit(WeatherMutations.ADD_WEATHER, response);
        dispatch('updateUserLocations');
      });
  },

  async getWeatherByCoordinates({ commit, dispatch }, payload: Coordinates): Promise<any> {
    await weatherService.fetchWeatherDataByCoordinates(payload)
      .then((response) => {
        commit(WeatherMutations.ADD_WEATHER, response);
        dispatch('updateUserLocations');
      });
  },

  async getWeatherForLocationList({ commit }, locations): Promise<any> {
    const tasks = locations.map((location: Location) => {
      return weatherService.fetchWeatherDataByLocation(location);
    });

    return Promise.allSettled(tasks)
      .then((results: PromiseSettledResult<any>[]) => {
        const values = results.map((result: any) => result.value)
        commit(WeatherMutations.SET_WEATHER, values);
      })
  },

  async addWeather({ commit, dispatch }, payload): Promise<any> {
    const result = await dispatch('getWeatherByLocation', payload);
    commit(WeatherMutations.ADD_WEATHER, result);
    dispatch('updateUserLocations');
  },

  removeWeather({ commit, dispatch }, weatherId): void {
    commit(WeatherMutations.REMOVE_WEATHER, weatherId);
    dispatch('updateUserLocations');
  },

  updateWeather({ commit, dispatch }, payload): void {
    commit(WeatherMutations.SET_WEATHER, payload);
    dispatch('updateUserLocations')
  },

  async getUsersLocations(): Promise<any> {
    const savedLocations = await locationService.getUsersSavedLocations();
    if (savedLocations && savedLocations.length) {
      return savedLocations;
    }

    return null;
  },

  updateUserLocations({ getters }): void {
    const locations = getters[WeatherGetters.GET_WEATHER]
      .map((location: Weather) => {
        return {
          city: location.city,
          country: location.country
        }
      });

    locationService.updateUserLocations(locations);
  }
}