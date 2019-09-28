<template>
<div>
  <UatHeader></UatHeader>
  <div class='row'>
    <div class='column map-column'>
        <div id="map" style="height: 100%; width: 100%;"></div>
    </div>
    <div class='column points-of-interest-column'>
      <div>
        <h2 style="text-align:center">Puncte de interes</h2>
        <PointsOfInterest></PointsOfInterest>
      </div>
    </div>
  </div>

  <div></div>
</div>
</template>

<script>

import UatHeader from './header/UatHeader';
import PointsOfInterest from './PointsOfInterest';
import MapInitializationService from '../../services/uat/mapInitializationService.js'

export default {
  name: 'UAT',
  components: {
    UatHeader,
    PointsOfInterest
  },
  computed: {

  },
  methods: {

  },
  mounted: function() {
    MapInitializationService.initMap();
    console.log("UAT module mounted");
  }
}
</script>

<style src="./uat.css"></style>
