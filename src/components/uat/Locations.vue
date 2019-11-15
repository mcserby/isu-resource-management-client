<template>
<div class="location-list">
  <h2 style="text-align:center">Locații</h2>
  <div :class="{ 'half-opacity': addingLocation }">
    <div class="">
      <button type="button" class="custom-button btn" @click="addNewLocation()">{{buttonText}}</button>
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
import WSA from "../../constants/actions";
import WebsocketSend from "../../contracts/websocketSend";
import WebsocketSubscribe from "../../contracts/websocketSubscribe";
import Location from '../../contracts/uat/location';
import LocationEditor from './form/LocationEditor';
import AddLocationRequest from "../../contracts/uat/addLocationRequest.js";
import UpdateLocationRequest from "../../contracts/uat/updateLocationRequest.js";
import DeleteLocationRequest from "../../contracts/uat/deleteLocationRequest.js";
import LocationsUpdatedNotification from "../../contracts/uat/locationsUpdatedNotification.js";

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
    addNewLocation() {
      this.addingLocation = true;
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
      if(this.addingLocation){
          this.$store.dispatch(
          WSA.WEBSOCKET_SEND,
          new WebsocketSend(
            "addLocation",
            new AddLocationRequest(
              location.name,
              location.coordinates,
              location.pointsOfInterest.split(",")
            )
          )
        );
      this.addingLocation = false;
      }else{
        this.$store.dispatch(
          WSA.WEBSOCKET_SEND,
          new WebsocketSend(
            "updateLocation",
            new UpdateLocationRequest( 
              location.id,
              location.name,
              location.coordinates,
              location.pointsOfInterest.split(",") )
          )
        );
      }

      MapService.addLocation(location);
      MapService.unsetMapClickHandler(this.triggerCreateLocation);
      MapService.setMapClickHandler(this.editLocationIfClicked);
      this.editLocation = false;
    },
    cancelEditLocation() {
      this.addingLocation = false;
      this.editLocation = false;
      console.log("location creation/edditing has been canceled.");
    },
    deleteLocation(location) {
      console.log('deleting location', location);
      MapService.deleteLocation(location);
      this.$store.dispatch(A.DELETE_LOCATION, location);
      this.$store.dispatch(
          WSA.WEBSOCKET_SEND,
          new WebsocketSend(
            "deleteLocation",
            new DeleteLocationRequest(location.id)
          )
        );
    },
    zoomToLocation(location) {
      MapService.zoomToLocation(location);
    },
  },
  mounted: function() {
    const self = this;
    let onLocationsReceived = function(response) {
        let r = JSON.parse(response.body);
        self.$store.dispatch(
          A.INIT_LOCATIONS,
          new LocationsUpdatedNotification(r.locations)
        );
      };

      let onError = function(error) {
        console.err(error);
      };

      this.$store.dispatch(
        A.WEBSOCKET_SUBSCRIBE,
        new WebsocketSubscribe("locations", onLocationsReceived, onError)
      );
      MapService.initMap();
      this.locations.forEach(l => MapService.addLocation(l));
      MapService.setMapClickHandler(this.editLocationIfClicked);
  }
}
</script>

<style src="./locations.css"></style>
