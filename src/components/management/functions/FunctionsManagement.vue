<template>
  <div class="functions-management-container">
    <FunctionsList class="function-list"></FunctionsList>
    <AddFunctionForm class="add-function-form" :key="getKey()"></AddFunctionForm>
  </div>
</template>

<script>
import Unit from "../../principal/unit/Unit.vue";
import A from "../../../constants/actions";
import FunctionsList from "./FunctionsList.vue";
import AddFunctionForm from "./AddFunctionForm.vue";
import WebsocketSubscribe from "../../../contracts/websocketSubscribe";
import WebsocketSend from "../../../contracts/websocketSend";
import FunctionsUpdatedNotification from "../../../contracts/management/functions/functionsUpdatedNotification";

export default {
  name: "FunctionsManagement",
  components: { FunctionsList, AddFunctionForm },
  data: () => {
    return {};
  },
  computed: {},
  methods: {
    getKey() {
      return this.$store.state.managementStore.selectedFunction.id;
    }
  },
  mounted: function() {
    console.log("FunctionsManagement module mounted");
    const self = this;
    let onFunctionsReceived = function(response) {
      let r = JSON.parse(response.body);
      self.$store.dispatch(
        A.MANAGED_FUNCTIONS_RECEIVED,
        new FunctionsUpdatedNotification(r.functions)
      );
    };
    let onError = function(error) {
      console.err(error);
    };
    this.$store.dispatch(
      A.WEBSOCKET_SUBSCRIBE,
      new WebsocketSubscribe("functions", onFunctionsReceived, onError)
    );
  }
};
</script>

<style src="./functionsManagement.css"></style>