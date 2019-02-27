<template>
  <div class="truck-name-list-section">
    <div class="truck-name-list-container" :list="managedTrucks">
      <div
        :class="getTruckClass(managedTruck)"
        class="truck-name-element item"
        @mousedown="selectTruck(managedTruck)"
        v-for="managedTruck in managedTrucks"
        :key="managedTruck.id"
      >{{managedTruck.shortName}}</div>
    </div>
  </div>
</template>

<script>
import A from "../../../constants/actions";
import WebsocketSubscribe from "../../../contracts/websocketSubscribe";
import WebsocketSend from "../../../contracts/websocketSend";
import draggable from "vuedraggable";
import UpdateTrucksRequest from '../../../contracts/management/trucks/updateTruckRequest';

export default {
  name: "TrucksList",
  components: {
    draggable
  },
  data: () => {
    return {};
  },
  computed: {
    managedTrucks() {
      return this.$store.state.managementStore.managedTrucks;
    }
  },
  methods: {
    selectTruck(managedTruck) {
      this.$store.dispatch(A.SELECT_MANAGED_TRUCK, managedTruck);
    },
    getTruckClass(managedTruck) {
      if (this.$store.state.managementStore.selectedTruck != null) {
        return [
          this.$store.state.managementStore.selectedTruck.id === managedTruck.id
            ? "truck-name-element-selected "
            : ""
        ];
      } else return "";
    }
  },
  mounted: function() {
    console.log("TrucksList module mounted");
  }
};
</script>

<style src="./trucksList.css"></style>