<template>
  <div>
    <Header title="Rapoarte" :displaySearchBar="false" :modules="modules"></Header>
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

  import Header from "../common/header/Header.vue";
  import A from "../../constants/actions";
  import ReportType from "../../constants/reportType";
  import WebsocketSend from "../../contracts/websocketSend";
  import GetReportRequest from "../../contracts/reports/getReportRequest";
  import WebsocketSubscribe from "../../contracts/websocketSubscribe";
  import WebsocketUnsubscribe from "../../contracts/websocketUnsubscribe";
  import Modules from '../../config/modules';

  export default {
    name: 'Report',
    data: () => {
      return {
        modules: [Modules.principal, Modules.services, Modules.management, Modules.uat],
      };
    },
    components: {
      Header
    },
    methods: {
      generateReport () {
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "getEquipmentReport",
            new GetReportRequest(ReportType.EQUIPMENT)
          ),
        );
      },
      generateMissionReport () {
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "getMissionsReport",
           new GetReportRequest(ReportType.MISSIONS)
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
        A.WEBSOCKET_SUBSCRIBE_USER,
        new WebsocketSubscribe("equipmentReport", onEquipmentReportReceived, onError)
      );
      this.$store.dispatch(
        A.WEBSOCKET_SUBSCRIBE_USER,
        new WebsocketSubscribe("missionsReport", onMissionReportReceived, onError)
      );

    }
  }
</script>

<style src="./report.css"></style>
