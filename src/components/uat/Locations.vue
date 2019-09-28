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
import Utils from '../../services/utils';
import A from '../../constants/actions';
import Location from '../../contracts/uat/location';

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
      MapService.setMapClickHandler(this.createLocation);
    },
    createLocation(mapEvent){
      console.log(mapEvent);
      // TODO open new Location Dialog
      const location = new Location(Utils.createUUID(), "Locație nouă", mapEvent.coordinate, []);
      this.$store.dispatch(A.ADD_LOCATION, location);
      MapService.addLocation(location);
      this.addingLocation = !this.addingLocation;
      MapService.unsetMapClickHandler(this.createLocation);
    },
    deleteLocation(location){
      console.log('deleting location', location);
      MapService.deleteLocation(location);
      this.$store.dispatch(A.DELETE_LOCATION, location);
    },
    zoomToLocation(location){
      MapService.zoomToLocation(location);
    },
  }
}
</script>

<style src="./locations.css"></style>
