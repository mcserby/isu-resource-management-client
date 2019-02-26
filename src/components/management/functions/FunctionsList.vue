<template>
  <div class="function-name-list-section">
    <draggable
      class="function-name-list-container"
      v-model="managedFunctions"
      :options="{draggable:'.item'}"
    >
      <div
        :class="getFunctionClass(managedFunction)"
        class="function-name-element item"
        v-for="managedFunction in managedFunctions"
        :key="managedFunction.id"
        @click="selectFunction(managedFunction)"
      >{{managedFunction.name}}</div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import A from "../../../constants/actions";

export default {
  name: "FunctionsList",
  components: {
    draggable
  },
  data: () => {
    return {};
  },
  computed: {
    managedFunctions() {
      return this.$store.state.managementStore.managedFunctions;
    }
  },
  methods: {
    selectFunction(managedFunction) {
      this.$store.dispatch(A.SELECT_MANAGED_FUNCTION, managedFunction);
    },
    getFunctionClass(managedFunction) {
      return [
        this.$store.state.managementStore.selectedFunction.id === managedFunction.id
          ? "function-name-element-selected "
          : ""
      ];
    }
  },
  mounted: function() {
    console.log("FunctionsList module mounted");
    this.$store.dispatch(
      A.SELECT_MANAGED_FUNCTION,
      this.$store.state.managementStore.managedFunctions[0]
    );
  }
};
</script>

<style src="./functionsList.css"></style>