<template>
  <div>
  <ReportsHeader></ReportsHeader>

    <div class="report-list-buttons">
      <button
        type="button"
        class="btn custom-report-button"
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

  export default {
    name: 'Report',
    components: {
      ReportsHeader
    },
    methods: {
      generateReport() {
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "getEquipmentReport",
            new UnlockSubUnitRequest("", "")
          )
        );
      }
    }
  }
</script>

<style src="./report.css"></style>
