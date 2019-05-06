<template>
  <div class="vehicle-management-container">
    <VehicleTypesList class="vehicle-list"></VehicleTypesList>
    <AddVehicleTypeForm class="add-vehicle-form" :key="getKey()"></AddVehicleTypeForm>
  </div>
</template>

<script>
import Unit from "../../principal/unit/Unit.vue";
import A from "../../../constants/actions";
import VehicleTypesList from "./VehicleTypesList.vue";
import AddVehicleTypeForm from "./AddVehicleTypeForm.vue";
import WebsocketSubscribe from "../../../contracts/websocketSubscribe";
import WebsocketUnsubscribe from "../../../contracts/websocketUnsubscribe";
import WebsocketSend from "../../../contracts/websocketSend";
import VehicleTypesUpdatedNotification from "../../../contracts/management/vehicles/vehicleTypesUpdatedNotification";

export default {
  name: "VehicleTypesManagement",
  components: { VehicleTypesList, AddVehicleTypeForm },
  data: () => {
    return {};
  },
  computed: {},
  methods: {
    getKey() {
      if (this.$store.state.managementStore.selectedVehicleType != null) {
        return this.$store.state.managementStore.selectedVehicleType.id;
      }
    }
  },
  mounted: function() {
    console.log("VehicleTypesManagement module mounted");
    const self = this;
    let onVehicleTypesReceived = function(response) {
      let r = JSON.parse(response.body);
      self.$store.dispatch(
        A.MANAGED_VEHICLE_TYPES_RECEIVED,
        new VehicleTypesUpdatedNotification(r.vehicleTypes)
      );
    };
    let onError = function(error) {
      console.err(error);
    };
    this.$store.dispatch(
      A.WEBSOCKET_SUBSCRIBE,
      new WebsocketSubscribe("vehicleTypes", onVehicleTypesReceived, onError)
    );
  },
  beforeDestroy() {
    this.$store.dispatch(
      A.WEBSOCKET_UNSUBSCRIBE,
      new WebsocketUnsubscribe("vehicleTypes")
    );
  }
};
</script>

<style src="./vehicleTypesManagement.css"></style>
