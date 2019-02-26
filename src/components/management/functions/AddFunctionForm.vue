<template>
  <div>
    <div class="form-group add-function-form">
      <label class="form-label" for="name">Numele funcției</label>
      <input type="text" required v-model="name" class="form-control" id="name">
    </div>
    <button
      type="button"
      class="btn custom-button add-function-button"
      @click="saveFunction"
    >Salvează</button>
  </div>
</template>
<script>
import UpdateFunctionRequest from "../../../contracts/management/functions/UpdateFunctionRequest";
import AddFunctionRequest from "../../../contracts/management/functions/AddFunctionRequest";
import DeleteFunctionRequest from "../../../contracts/management/functions/DeleteFunctionRequest";
import A from "../../../constants/actions";
import WebsocketSend from "../../../contracts/websocketSend";

export default {
  name: "AddFunctionForm",
  data: () => {
    return {
      editedName: null
    };
  },
  computed: {
    name: {
      // getter
      get: function() {
        if (this.$store.state.managementStore.selectedFunction != null) {
          return this.$store.state.managementStore.selectedFunction.name;
        } else {
          return "";
        }
      },
      // setter
      set: function(newValue) {
        this.editedName = newValue;
      }
    }
  },
  methods: {
    isSaveDisabled() {
      return this.editedName == null;
    },
    saveFunction() {
      let functionId = this.$store.state.managementStore.selectedFunction.id;
      if (functionId != null) {
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "updateFunction",
            new UpdateFunctionRequest(
              functionId,
              this.editedName == null
                ? this.$store.state.managementStore.selectedFunction.name
                : this.editedName
            )
          )
        );
      } else {
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "addFunction",
            new AddFunctionRequest(
              this.editedName == null
                ? this.$store.state.managementStore.selectedFunction.name
                : this.editedName
            )
          )
        );
      }
    },
  }
};
</script>
<style src="./addFunctionForm.css"></style>
