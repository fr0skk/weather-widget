<template>
  <v-container class="settings-wrapper scrollbar-dark">
    <v-autocomplete @click:clear="resetSearchQuery" :menu-props="{
      contentClass: 'scrollbar-dark', maxWidth: 206
    }" v-model="selectedLocation" :items="locations" :search-input.sync="searchQuery" class="location-input-wrapper"
      color="white" label="Add location" solo hide-no-data hide-details>
    </v-autocomplete>

    <v-divider class="mt-6"></v-divider>

    <v-list class="locations-list-wrapper pa-0">
      <draggable v-model="weatherList" group="weather" @start="drag = true" @end="drag = false">
        <v-list-item class="px-0" v-for="(item, i) in weatherList" :key="item.id">
          <v-list-item-icon class="mr-1">
            <v-btn icon small>
              <v-icon small>mdi-menu</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="locations-list-item-text" :title="item.city"
              v-text="item.city + ', ' + item.country"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon class="ml-1">
            <v-btn icon small @click.stop="deleteWeather(item.id)">
              <v-icon small>mdi-trash-can-outline</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </draggable>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import draggable from "vuedraggable";
import cities from "cities.json";
import { mapActions } from "vuex";
import { WeatherGetters } from "@/store/weather/getters";
import { Weather } from "@/shared/types";

export default Vue.extend({
  name: 'Settings',

  components: {
    draggable,
  },

  data() {
    return {
      drag: false as boolean,
      locations: [] as string[],
      searchQuery: null as null | string,
      selectedLocation: null as null | string,
    }
  },

  watch: {
    searchQuery(value: string): void {
      value && value !== this.selectedLocation && this.searchLocation(value)
    },

    selectedLocation(value: string): void {
      if (!value) return;

      const [city, country] = value.split(", ");

      if (!this.isLocationAlreadyAdded(city, country)) {
        this.getWeatherByLocation({ city, country });
        this.resetSearchQuery();
      }
    }
  },

  computed: {
    weatherList: {
      get() {
        return this.$store.getters[WeatherGetters.GET_WEATHER]
      },

      set(value) {
        return this.$store.dispatch("updateWeather", value)
      }
    }
  },

  methods: {
    ...mapActions([
      "removeWeather",
      "getWeatherByLocation",
      "updateWeather"
    ]),

    deleteWeather(weatherId: string): void {
      this.removeWeather(weatherId);
    },

    resetSearchQuery(): void {
      this.locations = [];
    },

    searchLocation(query: string): void {
      this.locations = cities
        .filter((city) => {
          return city.name.toLowerCase().includes(query.toLowerCase())
        })
        .map((foundСity) => {
          return `${foundСity.name}, ${foundСity.country}`
        });
    },

    isLocationAlreadyAdded(city: string, country: string): boolean {
      return this.weatherList.filter((weather: Weather) => weather.city === city && weather.country === country).length !== 0;
    }
  }
});
</script>

<style lang="scss">
@import "./Settings.scss"
</style>