<template>
  <div class="unit-locked">
    <div class="unit-header">
      {{unit.name}}
    </div>
    <hr/>
    <div v-for="resource in unit.resources" v-bind:key="resource.plateNumber">
      <ResourceSummary :resource="resource"></ResourceSummary>
    </div>
    <div style="margin-top: 50px">
      <button class="btn custom-button" @click="clearResources()">
        <span class="button-font-size">Actualizează</span>
      </button>
    </div>
    <div>
      <button class="btn custom-button" @click="addResources()">
        <span class="button-font-size">Adauga resurse</span>
      </button>
    </div>
  </div>

</template>

<script>

import A from '../../../constants/actions';
import ResourceSummary from './resource/ResourceSummary.vue';
import WebsocketSend from '../../../contracts/websocketSend';
import LockSubUnitRequest from '../../../contracts/edit/lockSubUnitRequest';

export default {
  name: 'Unit',
  props: ['unit'],
  components: {
    ResourceSummary,
  },
  methods: {
    clearResources() {
      this.$store.dispatch(A.WEBSOCKET_SEND, new WebsocketSend('locksubunit', new LockSubUnitRequest(this.unit.id)));

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
