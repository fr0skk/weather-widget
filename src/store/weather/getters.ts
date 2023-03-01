import { GetterTree } from "vuex";
import { RootState } from "../types";
import { WeatherState } from "./types";

export enum WeatherGetters {
  GET_WEATHER = "GET_WEATHER",
}

export const getters: GetterTree<WeatherState, RootState> = {
  [WeatherGetters.GET_WEATHER](state) {
    return state.weather;
  }
};