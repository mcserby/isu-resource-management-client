<template>
  <div v-bind:class="['resource-wrapper', rowNr % 2 == 0 ? 'odd' : 'even']"  v-on:mouseover="mouseOver"  v-on:mouseleave="mouseOut">
    <div class="resource-name-summary">
      <div class="resource-element-container">
        {{resource.vehicleType}}
      </div>
    </div>
    <div class="resource-identification-number-summary">
      <div class="resource-element-container">
        {{resource.identificationNumber}}
      </div>
    </div>
    <div class="resource-crew-number-summary">
      <div class="resource-element-container">
        {{this.crewSize}}
      </div>
    </div>
    <transition name="fade">
      <div class="resource-container" v-if="showResourceDetails">
        <Resource :resource="resource"></Resource>
      </div>
    </transition>
  </div>
</template>

<script>

import Resource from './Resource.vue'

export default {
  name: 'ResourceSummary',
  props: ['resource', 'rowNr'],
  data: () => {
    return {
      crewSize: 0,
      showResourceDetails: false
    }
  },
  components: {
    Resource
  },
  methods: {
    mouseOver: function () {
      this.showResourceDetails = true
    },
    mouseOut: function () {
      this.showResourceDetails = false
    },
    calculateCrewSize: function () {
      if (this.resource.crew != null) {
        this.crewSize = this.resource.crew.length + 1 // crew + captain
      } else {
        this.crewSize = 1
      }
    }
  },
  created () {
    this.calculateCrewSize()
  }
}
</script>

<style src="./resource.css"></style>
