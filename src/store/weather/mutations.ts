import { MutationTree } from "vuex";
import { WeatherState } from "./types";

export enum WeatherMutations {
  SET_WEATHER = "SET_WEATHER",
  ADD_WEATHER = "ADD_WEATHER",
  REMOVE_WEATHER = "REMOVE_WEATHER"
}

export const mutations: MutationTree<WeatherState> = {
  [WeatherMutations.SET_WEATHER](state, payload) {
    state.weather = [...payload];
  },
  [WeatherMutations.ADD_WEATHER](state, payload) {
    state.weather.push(payload);
  },
  [WeatherMutations.REMOVE_WEATHER](state, id) {
    state.weather = state.weather.filter((element) => element.id != id);
  }
};