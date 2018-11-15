<template>
  <div>
    <div class="unit-header">
      {{unit.id}}
    </div>
    <hr/>
    <div v-for="resource in unit.resources" v-bind:key="resource.name">
      <ResourceSummary :resource="resource"></ResourceSummary>
    </div>
    <div>
      <button class="btn btn-primary" @click="clearResources()">Actualizează detașamentul</button>
    </div>
    <div>
      <button class="btn btn-primary" @click="addResources()">Adauga resurse</button>
    </div>
  </div>

</template>

<script>

import A from '../../../constants/actions';
import ResourceSummary from './resource/ResourceSummary.vue';

export default {
  name: 'Unit',
  props: ['unit'],
  components: {
    ResourceSummary,
  },
  methods: {
    clearResources() {
      this.$store.dispatch(A.CLEAR_UNIT_RESOURCES, this.unit.id);
      this.$store.dispatch(A.OPEN_ADD_RESOURCE_DIALOG, this.unit.id);
    },
    addResources() {
      this.$store.dispatch(A.OPEN_ADD_RESOURCE_DIALOG, this.unit.id);
    }
  }
}
</script>

<style src="./unit.css"></style>
