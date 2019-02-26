<template>
  <div class="unit-name-list-section">
    <draggable class="unit-name-list-container" v-model="unitNames" :options="{draggable:'.item'}">
      <div
        :class="getSubUnitClass(name)"
        class="unit-name-element item"
        v-for="name in unitNames"
        :key="name"
        @click="selectSubUnit(name)"
      >{{name}}</div>
    </draggable>
  </div>
</template>

<script>
import Unit from "../../principal/unit/Unit.vue";
import A from "../../../constants/actions";
import draggable from "vuedraggable";

export default {
  name: "SubUnitsList",
  components: {
    Unit,
    draggable
  },
  data: () => {
    return {};
  },
  computed: {
    unitNames() {
      return this.$store.state.principalStore.units.map(u => u.name);
    }
  },
  methods: {
    getSubUnitClass(subUnitName) {
      return [
        this.$store.state.managementStore.selectedSubUnit === subUnitName
          ? "unit-name-element-selected"
          : ""
      ];
    },
    selectSubUnit(subUnitName) {
      this.$store.dispatch(A.SELECT_MANAGED_SUBUNIT, subUnitName);
    }
  },
  mounted: function() {
    console.log("Management module mounted");
    this.$store.dispatch(
      A.SELECT_MANAGED_SUBUNIT,
      this.$store.state.principalStore.units[0].name
    );
  }
};
</script>

<style src="./subUnitsList.css"></style>