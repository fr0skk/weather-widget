<template>
  <v-app>
    <Dashboard />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Dashboard from './components/Dashboard/Dashboard.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Dashboard
  },
});
</script>
<style>
@import "./styles/App.scss"
</style>