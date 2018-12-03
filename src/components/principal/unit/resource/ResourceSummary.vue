<template>
  <div v-bind:class="['resource-wrapper', rowNr % 2 == 0 ? 'odd' : 'even']"   v-on:click="mouseClick">
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
        {{this.resource.crew ? this.resource.crew.length + 1 : 1}}
      </div>
    </div>
  </div>
</template>

<script>

import Resource from './Resource.vue'
import A from '../../../../constants/actions'

export default {
  name: 'ResourceSummary',
  props: ['resource', 'rowNr'],

  components: {
    Resource
  },
  methods: {
    mouseClick: function () {
      this.$store.dispatch(A.OPEN_VIEW_RESOURCE_DIALOG, this.resource.identificationNumber);
    }
  }
}
</script>

<style src="./resource.css"></style>
