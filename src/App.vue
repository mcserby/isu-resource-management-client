<template>
  <div id="app" class="app-sa">
    <router-view/>
    <ConnectionLostLayer></ConnectionLostLayer>
  </div>
</template>

<script>
import A from "./constants/actions";
import ConnectionLostLayer from "./components/common/ConnectionLostLayer";
import WebsocketSubscribe from "./contracts/websocketSubscribe";
import authenticationService from './services/authentication/authentication';

export default {
  name: "App",
  components: {
    ConnectionLostLayer,
  },
  methods: {
    subscribeToWebsocketTopics() {
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

      if(this.$store.state.user.userProfile.userRoles.find(r => r === 'rapoarte')) {
        console.log("subscribing to reports...");
        let onEquipmentReportReceived = function (response) {
          self.$store.dispatch(A.SHOW_PDF_FILE, {'response': response.body, 'fileName': 'Raport S61.xlsx'});
        };

        let onMissionReportReceived = function (response) {
          self.$store.dispatch(A.SHOW_PDF_FILE, {'response': response.body, 'fileName': 'Raport misiuni.xlsx'});
        };
        this.$store.dispatch(
          A.WEBSOCKET_SUBSCRIBE_USER,
          new WebsocketSubscribe("equipmentReport", onEquipmentReportReceived, onError)
        );
        this.$store.dispatch(
          A.WEBSOCKET_SUBSCRIBE_USER,
          new WebsocketSubscribe("missionsReport", onMissionReportReceived, onError)
        );
      }

    }
  },
  beforeMount: function() {
  },
  mounted: function() {
    authenticationService.authenticate(this.$store, () => {
      this.$store.dispatch(A.WEBSOCKET_CONNECT);
      this.subscribeToWebsocketTopics();
      this.$router.push('/principal');
      console.log("application mounted");
    });
  }
};
</script>
<style src="./app.css"></style>
