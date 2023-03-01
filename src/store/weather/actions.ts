import { ActionTree } from "vuex";
import { RootState } from "../types";
import { Weather, Location } from "@/shared/types";
import { WeatherState } from "./types";
import { WeatherMutations } from "./mutations";
import { WeatherGetters } from "./getters";
import { weatherService } from "@/services/weather";
import { locationService } from "@/services/location";

export const actions: ActionTree<WeatherState, RootState> = {
  async getWeatherByLocation({ commit, dispatch }, payload: Location): Promise<any> {
    await weatherService.fetchWeatherData(payload)
      .then((response) => {
        commit(WeatherMutations.ADD_WEATHER, response);
        dispatch('updateUsersLocations');
      });
  },

  async getWeatherForLocationList({ commit }, locations): Promise<any> {
    const tasks = locations.map((location: Location) => {
      return weatherService.fetchWeatherData(location);
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
    dispatch('updateUsersLocations');
  },

  removeWeather({ commit, dispatch }, weatherId): void {
    commit(WeatherMutations.REMOVE_WEATHER, weatherId);
    dispatch('updateUsersLocations');
  },

  updateWeather({ commit, dispatch }, payload): void {
    commit(WeatherMutations.SET_WEATHER, payload);
    dispatch('updateUsersLocations')
  },

  async getUsersLocations(): Promise<any> {
    const savedLocations = await locationService.getUsersSavedLocations();
    if (savedLocations && savedLocations.length) {
      return savedLocations;
    }

    return null;
  },

  updateUsersLocations({ getters }): void {
    const locations = getters[WeatherGetters.GET_WEATHER]
      .map((location: Weather) => {
        return {
          city: location.city,
          country: location.country
        }
      });

    locationService.updateUsersLocations(locations);
  }
}