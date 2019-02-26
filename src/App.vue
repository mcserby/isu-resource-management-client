<template>
  <div id="app" class="app-sa">
    <router-view/>
    <ConnectionLostLayer></ConnectionLostLayer>
  </div>
</template>

<script>
import Vue from "vue";
import A from "./constants/actions";
import ConnectionLostLayer from "./components/common/ConnectionLostLayer.vue";
import WebsocketSubscribe from "./contracts/websocketSubscribe";

export default {
  name: "App",
  components: {
    ConnectionLostLayer
  },
  beforeMount: function() {
    console.log("App.vue mounted");
    this.$store.dispatch(A.WEBSOCKET_CONNECT);
  },
  mounted: function() {
    console.log("application mounted");
    const self = this;
    let onUnitsReceived = function(response) {
      let r = JSON.parse(response.body);
      self.$store.dispatch(A.INIT_UNITS, r.subUnitsList);
      self.$store.dispatch(A.MANAGED_SUBUNITS_RECEIVED, r);
      if (r.lockedSubUnits) {
        r.lockedSubUnits.forEach(lsu => self.$store.dispatch(A.LOCK_UNIT, lsu));
      }
    };
    let onUnitUpdated = function(response) {
      let r = JSON.parse(response.body);
      self.$store.dispatch(A.UNIT_UPDATED, r.subUnit);
    };
    let onError = function(error) {
      console.err(error);
    };
    this.$store.dispatch(
      A.WEBSOCKET_SUBSCRIBE,
      new WebsocketSubscribe("subunits", onUnitsReceived, onError)
    );
    this.$store.dispatch(
      A.WEBSOCKET_SUBSCRIBE,
      new WebsocketSubscribe("unitUpdatedNotification", onUnitUpdated, onError)
    );
  }
};
</script>
<style src="./app.css"></style>
