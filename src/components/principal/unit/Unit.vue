<template>
  <div>
    <div class="unit-header">
      {{unit.name}}
    </div>
    <div v-for="(resource,index) in filteredResources" v-bind:key="resource.plateNumber">
      <ResourceSummary :resource="resource" :rowNr="index"></ResourceSummary>
    </div>
    <div v-for="(equipment,index) in filteredEquipment" v-bind:key="equipment.equipmentId">
      <EquipmentSummary :equipment="equipment" :rowNr="index"></EquipmentSummary>
    </div>
  </div>
</template>

<script>

  import ResourceSummary from './resource/ResourceSummary.vue';
  import EquipmentSummary from './resource/EquipmentSummary.vue';
  import Vue from 'vue';

  Vue.use(require('vue-moment'));

  export default {
    name: 'Unit',
    props: ['unit'],
    components: {
      ResourceSummary, EquipmentSummary
    },
    computed: {
      resourceType() {
        return this.$store.state.principalStore.activeTab.resourceType;
      },
      filteredResources(){
        return this.unit.resources.filter(r => r.type === this.resourceType);
      },
      filteredEquipment(){
        return this.unit.equipment.filter(r => r.resourceType === this.resourceType);
      }
    }
  }
</script>

<style src="./unit.css"></style>
