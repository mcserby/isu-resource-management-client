<template>
<div>
  <UatHeader></UatHeader>
  <div class='uat-row'>
    <div class='uat-column map-column'>
        <div id="map" style="height: 100%; width: 100%;"></div>
    </div>
    <div class='uat-column points-of-interest-column'>
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
  }
}
</script>

<style src="./uat.css"></style>
