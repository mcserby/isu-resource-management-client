<template>
  <div class="vehicle-name-list-section">
    <div class="vehicle-name-list-container" :list="managedVehicleTypes">
      <div
        :class="getVehicleTypeClass(managedVehicleType)"
        class="vehicle-name-element item"
        @mousedown="selectVehicleType(managedVehicleType)"
        v-for="managedVehicleType in managedVehicleTypes"
        :key="managedVehicleType.id"
      >{{managedVehicleType.shortName}}</div>
    </div>
  </div>
</template>

<script>
import A from "../../../constants/actions";
import WebsocketSubscribe from "../../../contracts/websocketSubscribe";
import WebsocketSend from "../../../contracts/websocketSend";
import draggable from "vuedraggable";
import UpdateVehicleTypeRequest from '../../../contracts/management/vehicles/updateVehicleTypeRequest';

export default {
  name: "VehicleTypesList",
  components: {
    draggable
  },
  data: () => {
    return {};
  },
  computed: {
    managedVehicleTypes() {
      return this.$store.state.managementStore.managedVehicleTypes;
    }
  },
  methods: {
    selectVehicleType(managedVehicleType) {
      this.$store.dispatch(A.SELECT_MANAGED_VEHICLE_TYPE, managedVehicleType);
    },
    getVehicleTypeClass(managedVehicleType) {
      if (this.$store.state.managementStore.selectedVehicleType != null) {
        return [
          this.$store.state.managementStore.selectedVehicleType.id === managedVehicleType.id
            ? "vehicle-name-element-selected "
            : ""
        ];
      } else return "";
    }
  },
  mounted: function() {
    console.log("VehicleTypesList module mounted");
  }
};
</script>

<style src="./vehicleTypesList.css"></style>
