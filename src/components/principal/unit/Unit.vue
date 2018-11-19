<template>
  <div class="">
    <div class="unit-header">
      {{unit.name}}
    </div>
    <div v-for="(resource,index) in unit.resources" v-bind:key="resource.plateNumber">
      <ResourceSummary :resource="resource" :rowNr="index"></ResourceSummary>
    </div>
  </div>
</template>

<script>

import ResourceSummary from './resource/ResourceSummary.vue';

export default {
  name: 'Unit',
  props: ['unit'],
  components: {
    ResourceSummary,
  },
}
</script>

<style src="./unit.css"></style>
