<template>
  <div class="truck-name-list-section">
    <draggable class="truck-name-list-container" v-model="unitNames" :options="{draggable:'.item'}">
      <div class="truck-name-element item" v-for="name in unitNames" :key="name">{{name}}</div>
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
    unitNames() {
      return [];
    }
  },
  methods: {},
  mounted: function() {
    console.log("TrucksList module mounted");
  }
};
</script>

<style src="./trucksList.css"></style>