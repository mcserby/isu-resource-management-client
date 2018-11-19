<template>
  <div  v-bind:class="[isUnitLocked ? 'unit-locked' : '']">
    <div class="unit-header">
      {{unit.name}}
    </div>
    <hr/>
    <div v-for="resource in unit.resources" v-bind:key="resource.plateNumber">
      <ResourceSummary :resource="resource"></ResourceSummary>
    </div>
    <div style="margin-top: 50px">
      <button v-bind:class="['btn', 'custom-button', isUnitLocked ? 'button-hidden' : 'button-visible']" @click="clearResources()">
        <span class="button-font-size">Actualizează</span>
      </button>
    </div>
    <div>
      <button v-bind:class="['btn', 'custom-button', isUnitLocked ? 'button-hidden' : 'button-visible']" @click="addResources()">
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
      this.$store.dispatch(A.WEBSOCKET_SEND, new WebsocketSend('lockSubUnit', new LockSubUnitRequest(this.unit.name)));

      this.$store.dispatch(A.CLEAR_UNIT_RESOURCES, this.unit.name);
      this.$store.dispatch(A.OPEN_ADD_RESOURCE_DIALOG, this.unit.name);
    },
    addResources() {
      this.$store.dispatch(A.OPEN_ADD_RESOURCE_DIALOG, this.unit.name);
    },
  },
  computed: {
    isUnitLocked(){
      return Boolean(this.unit.isLocked);
    }
  }

}
</script>

<style src="./unit.css"></style>
