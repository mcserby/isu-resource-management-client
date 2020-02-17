<template>
<div>
  <Header title="UAT" :displaySearchBar="true"
          :initial-search-text="initialSearchText"
          :search-bar-placeholder="'Caută locații'" v-on:text="onSearchTextChanged"></Header>
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

  import A from '../../constants/actions';
  import Header from '../common/header/Header';
  import Locations from './Locations';

export default {
  name: 'UAT',
  data: () => {
    return {
    };
  },
  components: {
    Header,
    Locations
  },
  computed: {
    initialSearchText() {
      return this.$store.state.uatStore.filteringText;
    },
    locations(){
      return this.$store.state.uatStore.locations;
    }
  },
  methods: {
    onSearchTextChanged(value){
      this.$store.dispatch(A.APPLY_LOCATION_FILTER, value);
    },
  }
}
</script>

<style src="./uat.css"></style>
