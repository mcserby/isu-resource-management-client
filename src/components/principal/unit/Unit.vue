<template>
  <div>
    <div v-for="(resource,index) in filteredResources" v-bind:key="resource.id">
      <ResourceSummary :resource="resource" :rowNr="0" :editing-enabled="userHasRightsToEditCurrentUnit" @mouseClick="onResourceClick($event)"></ResourceSummary>
    </div>
    <div v-for="(equipment,index) in filteredEquipment" v-bind:key="equipment.equipmentId">
      <EquipmentSummary :equipment="equipment" :editing-enabled="userHasRightsToEditCurrentUnit" :rowNr="0"></EquipmentSummary>
    </div>
  </div>
</template>

<script>

  import ResourceSummary from './resource/ResourceSummary.vue';
  import A from '../../../constants/actions';
  import EquipmentSummary from './resource/EquipmentSummary.vue';
  import VueMoment from 'vue-moment';
  import Vue from 'vue';

  Vue.use(VueMoment);

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
        return resources.filter(r => words.every(w => r.status && r.status.key && this.removeAccents(r.status.key.toLowerCase()).indexOf(w) !== -1));
      },
      filteredEquipment(){
        return this.unit.equipment.filter(r => r.resourceType === this.resourceType);
      },
      userRoles() {
        return this.$store.state.user.userProfile.userRoles;
      },
      userHasRightsToEditCurrentUnit() {
        return Boolean(
          this.userRoles.find(r => r === 'supervisor' || r === this.unit.name)
        );
      },
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
