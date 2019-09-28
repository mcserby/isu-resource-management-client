<template>
<div class="point-of-interest-browser-list">
  <div class="">
    <div class="">
      <button type="button" class="custom-button btn" @click="addNewPointOfInterest()">Adaugă un punct de interes</button>
    </div>
  </div>
  <div class="point-of-interest-wrapper" v-for="(point) in pointsOfInterest" v-bind:key="point.id">
    <PointOfInterest :point="point" @mouseClick="onPointOfInterestClick(point)"></PointOfInterest>
    <div class="delete-resource">
      <button type="button" class="btn custom-close-button" @click="deletePointOfInterest(point)">X</button>
    </div>
  </div>
</div>
</template>

<script>

import PointOfInterest from './PointOfInterest';

export default {
  name: 'PointsOfInterest',
  data: () => {
    return { pointsOfInterest: [{id: 1, name: "Padurea cu alune"}, {id: 2, name: "Cenusareasa"}]};
  },
  components: {
    PointOfInterest
  },
  computed: {

  },
  methods: {
    addNewPointOfInterest(){
      console.log("add new point of interest");
    },
    onPointOfInterestClick(point){
      console.log("clicked point of interest");
    }
  },
}
</script>

<style src="./pointsOfInterest.css"></style>
