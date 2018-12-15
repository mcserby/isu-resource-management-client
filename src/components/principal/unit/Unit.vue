<template>
  <div>
    <div class="unit-header">
      {{unit.name}}
    </div>
    <div v-for="(resource,index) in filteredResources" v-bind:key="resource.plateNumber">
      <ResourceSummary :resource="resource" :rowNr="index" @mouseClick="onResourceClick($event)"></ResourceSummary>
    </div>
  </div>
</template>

<script>

  import ResourceSummary from './resource/ResourceSummary.vue';
  import A from '../../../constants/actions';
  import Vue from 'vue';

  Vue.use(require('vue-moment'));

  export default {
    name: 'Unit',
    props: ['unit'],
    components: {
      ResourceSummary,
    },
    computed: {
      resourceType() {
        return this.$store.state.principalStore.activeTab.resourceType;
      },
      filteredResources(){
        return this.unit.resources.filter(r => r.type === this.resourceType);
      }
    },
    methods: {
      onResourceClick(resource){
        this.$store.dispatch(A.OPEN_VIEW_RESOURCE_DIALOG, resource);
      }
    }
  }
</script>

<style src="./unit.css"></style>
