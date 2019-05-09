<template>
  <div>
  <ReportsHeader></ReportsHeader>

    <div class="report-list-buttons">
      <button
        type="button"
        class="btn custom-report-button" @click="generateMissionReport()"
      >Raport Misiuni</button>
      <button
        type="button"
        class="btn custom-report-button" @click="generateReport()"
      >Raport Resurse</button>
      <button
        type="button"
        class="btn custom-report-button"
      >Raport Servicii</button>

    </div>
  </div>
</template>

<script>

  import ReportsHeader from "./header/ReportsHeader.vue";
  import A from "../../constants/actions";
  import WebsocketSend from "../../contracts/websocketSend";
  import UnlockSubUnitRequest from "../../contracts/edit/unlockSubUnitRequest";
  import WebsocketSubscribe from "../../contracts/websocketSubscribe";
  import WebsocketUnsubscribe from "../../contracts/websocketUnsubscribe";

  export default {
    name: 'Report',
    components: {
      ReportsHeader
    },
    methods: {
      generateReport () {
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "getEquipmentReport",
            new UnlockSubUnitRequest("", "")
          ),
        );
      },
      generateMissionReport () {
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "getMissionsReport",
            new UnlockSubUnitRequest("", "")
          )
        );
      }
    },
    beforeDestroy () {
      this.$store.dispatch(
        A.WEBSOCKET_UNSUBSCRIBE,
        new WebsocketUnsubscribe("equipmentReport")
      );
      this.$store.dispatch(
        A.WEBSOCKET_UNSUBSCRIBE,
        new WebsocketUnsubscribe("missionsReport")
      );
    },
    mounted: function () {
      console.log("Report.vue mounted");
      const self = this;
      let onError = function (error) {
        console.err(error);
      };

      let onEquipmentReportReceived = function (response) {
        self.$store.dispatch(A.SHOW_PDF_FILE, {'response': response.body, 'fileName': 'Raport S61.xlsx'});
      };

      let onMissionReportReceived = function (response) {
        self.$store.dispatch(A.SHOW_PDF_FILE, {'response': response.body, 'fileName': 'Raport misiuni.xlsx'});
      };
      this.$store.dispatch(
        A.WEBSOCKET_SUBSCRIBE,
        new WebsocketSubscribe("equipmentReport", onEquipmentReportReceived, onError)
      );
      this.$store.dispatch(
        A.WEBSOCKET_SUBSCRIBE,
        new WebsocketSubscribe("missionsReport", onMissionReportReceived, onError)
      );

    }
  }
</script>

<style src="./report.css"></style>
