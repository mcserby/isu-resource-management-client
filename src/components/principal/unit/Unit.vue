<template>
  <div>
<!--    <div class="unit-header">
      {{unit.name}}
    </div>-->
    <div v-for="(resource,index) in filteredResources" v-bind:key="resource.id">
      <ResourceSummary :resource="resource" :rowNr="index" @mouseClick="onResourceClick($event)"></ResourceSummary>
    </div>
    <div v-for="(equipment,index) in filteredEquipment" v-bind:key="equipment.equipmentId">
      <EquipmentSummary :equipment="equipment" :rowNr="index"></EquipmentSummary>
    </div>
  </div>
</template>

<script>

  import ResourceSummary from './resource/ResourceSummary.vue';
  import A from '../../../constants/actions';
  import EquipmentSummary from './resource/EquipmentSummary.vue';
  import Vue from 'vue';

  Vue.use(require('vue-moment'));

  export default {
    name: 'Unit',
    props: ['unit'],
    components: {
      ResourceSummary,
      EquipmentSummary
    },
    computed: {
      resourceType() {
        return this.$store.state.principalStore.activeTab.resourceType;
      },
      filteredResources(){
        const searchText = this.$store.state.principalStore.searchText;
        let resources = this.unit.resources.filter(r => r.type === this.resourceType);
        if(searchText === ''){
          return resources;
        }
        let words = searchText.split(' ').filter(w => w.length > 0);
        return resources.filter(r => words.some(w => r.status && r.status.key && r.status.key.indexOf(w) !== -1));
      },
      filteredEquipment(){
        return this.unit.equipment.filter(r => r.resourceType === this.resourceType);
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
