<template>
<div>
  <UatHeader></UatHeader>
  <div class='row'>
    <div class='column map-column'>
        <div id="map" style="height: 100%; width: 100%;"></div>
    </div>
    <div class='column points-of-interest-column'>
        <Locations></Locations>
    </div>
  </div>

  <div></div>
</div>
</template>

<script>

import UatHeader from './header/UatHeader';
import Locations from './Locations';
import MapService from '../../services/uat/mapService.js'

export default {
  name: 'UAT',
  components: {
    UatHeader,
    Locations
  },
  computed: {
    locations(){
      return this.$store.state.uatStore.locations;
    }
  },
  methods: {

  },
  mounted: function() {
    MapService.initMap();
    // initLocations from server
    this.locations.forEach(l => MapService.addLocation(l));
    console.log("UAT module mounted");
  }
}
</script>

<style src="./uat.css"></style>
