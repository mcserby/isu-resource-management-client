<template>
  <div v-bind:class="['resource-wrapper', rowNr % 2 == 0 ? 'odd' : 'even']"  v-on:mouseover="mouseOver"  v-on:mouseleave="mouseOut">
    <div class="resource-name-summary">
      <div class="resource-element-container">
        {{resource.vehicleType}}
      </div>
    </div>
    <div class="resource-plate-number-summary">
      <div class="resource-element-container">
        {{resource.plateNumber}}
      </div>
    </div>
    <div class="resource-container" v-if="showResourceDetails">
      <Resource :resource="resource"></Resource>
    </div>
  </div>
</template>

<script>

  import Resource from './Resource.vue';

  export default {
    name: 'ResourceSummary',
    props: ['resource', 'rowNr'],
    data: () => {
      return {
        showResourceDetails: false,
      }
    },
    components: {
      Resource,
    },
    methods: {
      mouseOver: function(){
        this.showResourceDetails = true;
      },
      mouseOut: function(){
        this.showResourceDetails = false;
      },
    }
  }
</script>

<style src="./resource.css"></style>
