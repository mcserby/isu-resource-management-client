<template>
  <div class="truck-name-list-section">
    <draggable
      class="truck-name-list-container"
      v-model="managedTrucks"
      :options="{draggable:'.item'}"
    >
      <div
        :class="getTruckClass(truck)"
        class="truck-name-element item"
        @click="selectTruck(truck)"
        v-for="truck in managedTrucks"
        :key="truck.id"
      >{{truck.shortName}}</div>
    </draggable>
  </div>
</template>

<script>
import Unit from "../../principal/unit/Unit.vue";
import A from "../../../constants/actions";
import WebsocketSubscribe from "../../../contracts/websocketSubscribe";
import WebsocketSend from "../../../contracts/websocketSend";
import draggable from "vuedraggable";

export default {
  name: "TrucksList",
  components: {
    Unit,
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