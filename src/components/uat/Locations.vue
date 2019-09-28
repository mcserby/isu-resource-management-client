<template>
<div class="location-list" :class="{ 'half-opacity': addingLocation }">
  <h2 style="text-align:center">Locații</h2>
  <div class="">
    <div class="">
      <button type="button" class="custom-button btn" @click="addLocation()">{{buttonText}}</button>
    </div>
  </div>
  <div class="location-wrapper" v-for="(location) in locations" v-bind:key="location.id">
    <div v-on:click="zoomToLocation(location)">
      <LocationItem :location="location"></LocationItem>
    </div>
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
    return {
      addingLocation: false,
      addLocationButtonText: "Adaugă o locație",
      selectLocationOnMap: "Selectează locația pe hartă (X)"
    };
  },
  components: {
    LocationItem
  },
  computed: {
    buttonText(){
      return this.addingLocation ? this.selectLocationOnMap : this.addLocationButtonText;
    },
    locations(){
      return this.$store.state.uatStore.locations;
    }
  },
  methods: {
    addLocation(){
      this.addingLocation = !this.addingLocation;
    },
    deleteLocation(location){
      console.log('deleting location', location);
      MapService.deleteLocation(location);
      this.$store.dispatch(A.DELETE_LOCATION, location);
    },
    zoomToLocation(location){
      MapService.zoomToLocation(location);
    }
  },
}
</script>

<style src="./locations.css"></style>
