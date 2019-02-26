<template>
  <div class="unit-name-list-section">
    <draggable class="unit-name-list-container" @change="update" :list="managedSubUnits">
      <div
        :class="getSubUnitClass(managedSubUnit)"
        class="unit-name-element item"
        v-for="managedSubUnit in managedSubUnits"
        :key="managedSubUnit.id"
        @mousedown="selectSubUnit(managedSubUnit)"
      > ||| {{managedSubUnit.name}}</div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
//import UpdateSubUnitsRequest from "../../../contracts/management/subUnits/updateSubUnitsRequest";
import A from "../../../constants/actions";
import WebsocketSend from "../../../contracts/websocketSend";

export default {
  name: "SubUnitsList",
  components: {
    draggable
  },
  data: () => {
    return {};
  },
  computed: {
    managedSubUnits: {
      get() {
        return this.$store.state.managementStore.managedSubUnits;
      },
      set(value) {}
    }
  },
  methods: {
     update(managedSubUnit) {
      this.$store.dispatch(
        A.WEBSOCKET_SEND,
        new WebsocketSend(
          "updateSubUnits",
          new UpdateSubUnitsRequest(
            this.$store.state.managementStore.managedSubUnit
          )
        )
      );
    },
    selectSubUnit(managedSubUnit) {
      this.$store.dispatch(A.SELECT_MANAGED_SUBUNIT, managedSubUnit);
    },
    getSubUnitClass(managedSubUnit) {
      if (this.$store.state.managementStore.selectedSubUnit != null) {
        return [
          this.$store.state.managementStore.selectedSubUnit.id ===
          managedSubUnit.id
            ? "unit-name-element-selected "
            : ""
        ];
      } else return "";
    }
  },
  mounted: function() {
    console.log("Management module mounted");  
  }
};
</script>

<style src="./subUnitsList.css"></style>