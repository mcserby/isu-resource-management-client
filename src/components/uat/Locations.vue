<template>
<div class="location-list">
  <h2 style="text-align:center">Locații</h2>
  <div class="">
    <div class="">
      <button type="button" class="custom-button btn" @click="addLocation()">Adaugă o locație</button>
    </div>
  </div>
  <div class="location-wrapper" v-for="(location) in locations" v-bind:key="location.id">
    <LocationItem :location="location" @mouseClick="onLocationClick(location)"></LocationItem>
    <div class="delete-resource">
      <button type="button" class="btn custom-close-button" @click="deleteLocation(location)">X</button>
    </div>
  </div>
</div>
</template>

<script>

import LocationItem from './LocationItem';
import MapService from '../../services/uat/mapService';
import A from "../../constants/actions.js";

export default {
  name: 'Locations',
  data: () => {
    return {};
  },
  components: {
    LocationItem
  },
  computed: {
    locations(){
      return this.$store.state.uatStore.locations;
    }
  },
  methods: {
    addLocation(){
      console.log("add new point of interest");
    },
    deleteLocation(location){
      console.log('deleting location', location);
      MapService.deleteLocation(location);
      this.$store.dispatch(A.DELETE_LOCATION, location);
    },
    onLocationClick(point){
      console.log("clicked point of interest");
    }
  },
}
</script>

<style src="./locations.css"></style>
