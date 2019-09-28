<template>
<div class="location-list">
  <h2 style="text-align:center">Locații</h2>
  <div :class="{ 'half-opacity': addingLocation }">
    <div class="">
      <button type="button" class="custom-button btn" @click="addLocation()">{{buttonText}}</button>
    </div>
  </div>
  <div style="height: calc(100vh - 250px); overflow-y: scroll">
    <div class="location-wrapper" :class="{ 'half-opacity': addingLocation }" v-for="(location) in locations" v-bind:key="location.id">
      <div v-on:click="zoomToLocation(location)">
        <LocationItem :location="location"></LocationItem>
      </div>
      <div class="delete-resource">
        <button type="button" class="btn custom-close-button" @click="deleteLocation(location)">X</button>
      </div>
    </div>
  </div>
  <LocationEditor v-if="editLocation" :newLocation="newLocation" @saveLocation="submitLocation" @cancelEditLocation="cancelEditLocation"></LocationEditor>
</div>
</template>

<script>
import LocationItem from './LocationItem';
import MapService from '../../services/uat/mapService';
import Utils from '../../services/utils';
import A from '../../constants/actions';
import Location from '../../contracts/uat/location';
import LocationEditor from './form/LocationEditor';

export default {
  name: 'Locations',
  data: () => {
    return {
      addingLocation: false,
      addLocationButtonText: "Adaugă o locație",
      selectLocationOnMap: "Selectează locația pe hartă (X)",
      editLocation: false,
      newLocation: null,
    };
  },
  components: {
    LocationItem,
    LocationEditor
  },
  computed: {
    buttonText() {
      return this.addingLocation ? this.selectLocationOnMap : this.addLocationButtonText;
    },
    locations() {
      return this.$store.state.uatStore.locations;
    }
  },
  methods: {
    addLocation() {
      this.addingLocation = !this.addingLocation;
      MapService.unsetMapClickHandler(this.editLocationIfClicked);
      MapService.setMapClickHandler(this.triggerCreateLocation);
    },
    triggerCreateLocation(mapEvent) {
      console.log(mapEvent);
      const location = new Location(Utils.createUUID(), "Locație nouă", mapEvent.coordinate, []);
      this.newLocation = location;
      this.editLocation = true;
    },
    editLocationIfClicked(mapEvent) {
      console.log(mapEvent);
      const location = MapService.getLocationAtPixel(mapEvent);
      if (location) {
        console.log(location);
        console.log('found location with id ', location.getId());
        this.newLocation = JSON.parse(JSON.stringify(this.locations.filter(l => l.id === location.getId())[0]));
        this.editLocation = true;
      }
    },
    submitLocation(location) {
      this.$store.dispatch(A.ADD_LOCATION, location);
      MapService.addLocation(location);
      this.addingLocation = !this.addingLocation;
      MapService.unsetMapClickHandler(this.triggerCreateLocation);
      MapService.setMapClickHandler(this.editLocationIfClicked);
      this.editLocation = false;
    },
    cancelEditLocation() {
      this.editLocation = false;
      console.log("location creation/edditing has been canceled.");

    },
    deleteLocation(location) {
      console.log('deleting location', location);
      MapService.deleteLocation(location);
      this.$store.dispatch(A.DELETE_LOCATION, location);
    },
    zoomToLocation(location) {
      MapService.zoomToLocation(location);
    },
  },
  mounted: function() {
    MapService.initMap();
    this.locations.forEach(l => MapService.addLocation(l));
    MapService.setMapClickHandler(this.editLocationIfClicked);
  }
}
</script>

<style src="./locations.css"></style>
