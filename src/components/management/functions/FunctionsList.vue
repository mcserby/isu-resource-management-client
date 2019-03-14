<template>
  <div class="function-name-list-section">
    <draggable @change="update" class="function-name-list-container" :list="managedFunctions">
      <div
        :class="getFunctionClass(managedFunction)"
        class="function-name-element item"
        v-for="managedFunction in managedFunctions"
        :key="managedFunction.id"
        @mousedown="selectFunction(managedFunction)"
      > ||| {{managedFunction.name}}</div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import UpdateFunctionsRequest from "../../../contracts/management/functions/UpdateFunctionsRequest";
import A from "../../../constants/actions";
import WebsocketSend from "../../../contracts/websocketSend";

export default {
  name: "FunctionsList",
  components: {
    draggable
  },
  data: () => {
    return {};
  },
  computed: {
    managedFunctions: {
      get() {
        return this.$store.state.managementStore.managedFunctions;
      },
      set(value) {}
    }
  },
  methods: {
    update(managedFunction) {
      this.$store.dispatch(
        A.WEBSOCKET_SEND,
        new WebsocketSend(
          "updateFunctions",
          new UpdateFunctionsRequest(
            this.$store.state.managementStore.managedFunctions
          )
        )
      );
    },
    selectFunction(managedFunction) {
      this.$store.dispatch(A.SELECT_MANAGED_FUNCTION, managedFunction);
    },
    getFunctionClass(managedFunction) {
      if (this.$store.state.managementStore.selectedFunction != null) {
        return [
          this.$store.state.managementStore.selectedFunction.id ===
          managedFunction.id
            ? "function-name-element-selected "
            : ""
        ];
      } else return "";
    }
  },
  mounted: function() {
    console.log("FunctionsList module mounted");
  }
};
</script>

<style src="./functionsList.css"></style>
