<template>
<div>
  <Header title="UAT" :displaySearchBar="true" :modules="modules"></Header>
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

import Header from '../common/header/Header';
import Locations from './Locations';
import Modules from '../../config/modules';

export default {
  name: 'UAT',
  data: () => {
    return {
      modules: [Modules.principal, Modules.services, Modules.management, Modules.reports],
    };
  },
  components: {
    Header,
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
