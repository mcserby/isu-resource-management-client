<template>
  <div>
    <div v-for="(resource,index) in filteredResources" v-bind:key="resource.id">
      <ResourceSummary :resource="resource" :rowNr="0" @mouseClick="onResourceClick($event)"></ResourceSummary>
    </div>
    <div v-for="(equipment,index) in filteredEquipment" v-bind:key="equipment.equipmentId">
      <EquipmentSummary :equipment="equipment" :rowNr="0"></EquipmentSummary>
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
        const searchText = this.removeAccents(this.$store.state.principalStore.searchText.toLowerCase());
        let resources = this.unit.resources.filter(r => r.type === this.resourceType);
        if(searchText === ''){
          return resources;
        }
        let words = searchText.split(' ').filter(w => w.length > 0);
        return resources.filter(r => words.some(w => r.status && r.status.key && this.removeAccents(r.status.key).indexOf(w) !== -1));
      },
      filteredEquipment(){
        return this.unit.equipment.filter(r => r.resourceType === this.resourceType);
      }
    },
    methods: {
      onResourceClick(resource){
        this.$store.dispatch(A.OPEN_VIEW_RESOURCE_DIALOG, resource);
      },
      removeAccents(text){
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      }
    }
  }
</script>

<style src="./unit.css"></style>
