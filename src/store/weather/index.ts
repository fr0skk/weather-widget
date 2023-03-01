import { Module } from "vuex";
import { RootState } from "../types";
import { WeatherState } from "./types";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

const state: WeatherState = {
  weather: []
};

export const weather: Module<WeatherState, RootState> = {
  state,
  getters,
  mutations,
  actions
}