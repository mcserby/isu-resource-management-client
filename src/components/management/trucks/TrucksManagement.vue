<template>
  <div class="truck-management-container">
    <TrucksList class="truck-list"></TrucksList>
    <AddTruckForm class="add-truck-form"></AddTruckForm>
  </div>
</template>

<script>
import Unit from "../../principal/unit/Unit.vue";
import A from "../../../constants/actions";
import TrucksList from "./TrucksList.vue";
import AddTruckForm from "./AddTruckForm.vue";
import WebsocketSubscribe from "../../../contracts/websocketSubscribe";
import WebsocketSend from "../../../contracts/websocketSend";
import TrucksUpdatedNotification from "../../../contracts/management/trucks/trucksUpdatedNotification";

export default {
  name: "TrucksManagement",
  components: { TrucksList, AddTruckForm },
  data: () => {
    return {};
  },
  computed: {},
  methods: {},
  mounted: function() {
    console.log("TrucksManagement module mounted");
    const self = this;
    let onTrucksReceived = function(response) {
      let r = JSON.parse(response.body);
      self.$store.dispatch(
        A.MANAGED_TRUCKS_RECEIVED,
        new TrucksUpdatedNotification(r.trucks)
      );
    };
    let onError = function(error) {
      console.err(error);
    };
    this.$store.dispatch(
      A.WEBSOCKET_SUBSCRIBE,
      new WebsocketSubscribe("trucks", onTrucksReceived, onError)
    );
  }
};
</script>

<style src="./trucksManagement.css"></style>