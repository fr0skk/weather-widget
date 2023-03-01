<template>
  <v-card class="dashboard mx-auto overflow-hidden">

    <v-app-bar height="36">
      <v-toolbar-title>
        <h2 class="toolbar-title">Weather Forecast</h2>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon small @click.stop="toggleSettingsVisibility()">
        <v-icon small>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="isSettingsVisible" absolute right temporary>
      <div class="drawer-content-wrapper ma-0 pa-0 fill-height  overflow-hidden">
        <v-app-bar height="36" class="drawer-bar-wrapper">
          <v-toolbar-title>
            <h2 class="toolbar-title">Settings</h2>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon small @click.stop="toggleSettingsVisibility()">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-app-bar>

        <Settings />
      </div>
    </v-navigation-drawer>

    <v-container class="weather-list-wrapper scrollbar-dark pa-0 px-3 pt-4">
      <v-fade-transition group>
        <WeatherForecast v-for="item in weatherList" :key="item.id" :weather="item" />
      </v-fade-transition>

      <div class="no-data-placeholder mt-8" v-if="!weatherList || weatherList.length === 0 && isDataLoaded">
        <p class="text-caption text-center text--secondary">
          Please provide your location or enter it manually
        </p>
      </div>

      <div v-if="!isDataLoaded" class="mx-auto d-flex justify-center mt-8">
        <v-progress-circular indeterminate size="48"></v-progress-circular>
      </div>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import { WeatherGetters } from "@/store/weather/getters";
import { locationService } from "@/services/location";
import WeatherForecast from "../WeatherForecast/WeatherForecast.vue";
import Settings from "../Settings/Settings.vue";

export default Vue.extend({
  name: "Dashboard",

  components: {
    WeatherForecast,
    Settings
  },

  data: () => ({
    isDataLoaded: false as boolean,
    isSettingsVisible: false as boolean,
  }),

  computed: {
    ...mapGetters({
      "weatherList": WeatherGetters.GET_WEATHER
    })
  },

  methods: {
    ...mapActions([
      "getWeatherByLocation",
      "getWeatherByCoordinates",
      "getUsersLocations",
      "getWeatherForLocationList"
    ]),

    toggleSettingsVisibility(): void {
      this.isSettingsVisible = !this.isSettingsVisible;
    },

    async getWeatherFromRequestedUserLocation() {
      return locationService.requestUserLocation()
        .then((position) => {
          this.getWeatherByCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
            .then(() => {
              this.isDataLoaded = true;
            })
        })
    }
  },

  mounted() {
    setTimeout(() => {
      this.isDataLoaded = true;
    }, 2000);

    this.getUsersLocations()
      .then((locations) => {
        if (locations && locations.length) {
          this.getWeatherForLocationList(locations)
            .then(() => {
              this.isDataLoaded = true;
            })
          return;
        }

        return this.getWeatherFromRequestedUserLocation();
      })
  }
});

</script>

<style lang="scss">
@import "./Dashboard.scss"
</style>