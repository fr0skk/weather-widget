import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "./types";
import { weather } from "./weather/index";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    weather
  }
}

export default new Vuex.Store<RootState>(store);