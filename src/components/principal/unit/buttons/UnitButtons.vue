<template>
  <div class="unit-buttons">
    <div>
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

  import A from '../../../../constants/actions';
  import ResourceSummary from './../resource/ResourceSummary.vue';
  import WebsocketSend from '../../../../contracts/websocketSend';
  import LockSubUnitRequest from '../../../../contracts/edit/lockSubUnitRequest';

  export default {
    name: 'UnitButtons',
    props: ['unit'],
    components: {
    },
    methods: {
      clearResources() {
        this.$store.dispatch(A.WEBSOCKET_SEND, new WebsocketSend('locksubunit', new LockSubUnitRequest(this.unit.name)));

        this.$store.dispatch(A.CLEAR_UNIT_RESOURCES, this.unit.name);
        this.$store.dispatch(A.OPEN_ADD_RESOURCE_DIALOG, this.unit.name);
      },
      addResources() {
        this.$store.dispatch(A.OPEN_ADD_RESOURCE_DIALOG, this.unit.name);
      }
    },
  }
</script>

<style src="./../unit.css"></style>
