<template>
  <div class="unit-buttons">
    <div>
      <button class="btn custom-button" :disabled="isUnitLocked" @click="shiftExchange()">
        <span class="button-font-size">Schimb de tură</span>
      </button>
    </div>
    <div>
      <button class="btn custom-button" :disabled="isUnitLocked" @click="addResources()">
        <span class="button-font-size">Actualizează</span>
      </button>
    </div>
    <div class="last-updated">
      <span><b>{{ unit.lastUpdate | moment("DD.MM.YYYY, HH:mm:ss") }}</b></span>
    </div>
  </div>
</template>


<script>

  import A from '../../../../constants/actions';
  import WebsocketSend from '../../../../contracts/websocketSend';
  import LockSubUnitRequest from '../../../../contracts/edit/lockSubUnitRequest';
  import UpdateSubUnitRequest from "../../../../contracts/edit/updateSubUnitRequest";

  export default {
    name: 'UnitButtons',
    props: ['unit'],
    components: {},
    methods: {
      shiftExchange() {
        this.$store.dispatch(A.WEBSOCKET_SEND, new WebsocketSend('lockSubUnit', new LockSubUnitRequest(this.unit.name)));
        this.$store.dispatch(A.CLEAR_UNIT_RESOURCES, this.unit.name);
        this.$store.dispatch(A.OPEN_CONFIRMATION_DIALOG, this.unit.name);
      },
      addResources() {
        this.$store.dispatch(A.WEBSOCKET_SEND, new WebsocketSend('lockSubUnit', new LockSubUnitRequest(this.unit.name)));
        this.$store.dispatch(A.OPEN_ADD_RESOURCE_DIALOG, this.unit.name);
      }
    },
    computed: {
      isUnitLocked() {
        return Boolean(this.unit.isLocked);
      }
    }
  }
</script>

<style src="./../unit.css"></style>
