<template>
  <v-card class="mx-auto weather-card mb-4">
    <v-list-item class="px-3">
      <v-list-item-content class="pa-0">
        <v-list-item-title :title="location" class="weather-card-title text-center">
          {{ location }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-list-item-content class="pt-0">
        <v-row align="center">
          <v-col cols="12" align="center" class="pb-0">
            <v-img :src="iconSrc" width="64" contain></v-img>
          </v-col>
          <v-col cols="12" align="center">
            <v-list-item-title class="text-center text-caption text--secondary font-weight-light">
              {{ weather.description }}
            </v-list-item-title>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-list-item-content class="pt-0">
        <v-row align="center" class="flex-nowrap">
          <v-col cols="6" align="start">
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-icon small>mdi-water-outline</v-icon>
                <span class="text-caption font-weight-light">
                  {{ humidity }}
                </span>
              </v-col>
              <v-col cols="12" class="pt-0">
                <v-icon small>mdi-weather-windy</v-icon>
                <span class="text-caption font-weight-light">
                  {{ windSpeed }}
                </span>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-list-item-title class="temperature text-right">
              <div>{{ temperature }}&deg;</div>
            </v-list-item-title>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { getIconNameByCode } from "@/shared/helpers";

export default Vue.extend({
  name: "WeatherForecast",
  props: ["weather"],
  computed: {
    location(): string {
      return `${this.weather.city}, ${this.weather.country}`
    },

    temperature(): string {
      return `${Math.round(this.weather.temp)}`
    },

    windSpeed(): string {
      return `${Math.round(this.weather.windSpeed)} km/h`
    },

    humidity(): string {
      return `${Math.round(this.weather.humidity)}%`
    },

    iconSrc(): string {
      return `/assets/icons/${getIconNameByCode(this.weather.icon)}.svg`
    }
  }
});
</script>
<style lang="scss">
@import "./WeatherForecast.scss"
</style>