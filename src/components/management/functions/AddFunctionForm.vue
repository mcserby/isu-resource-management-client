<template>
  <div>
    <div class="form-group add-function-form">
      <label class="form-label" for="name">Numele funcției</label>
      <input type="text" required v-model="name" class="form-control" id="name">
      <button
        type="button"
        class="btn custom-button add-function-button"
        @click="saveFunction"
        :disabled="isSaveDisabled()"
      >Salvează</button>
    </div>
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
        if (this.editedName != null) {
          return this.editedName;
        } else if (this.$store.state.managementStore.selectedFunction != null) {
          return this.$store.state.managementStore.selectedFunction.name;
        } else {
          return null;
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
      var isUnchanged = this.editedName == null || this.editedName === "";
      if (!isUnchanged) {
        this.$store.dispatch(A.SELECTED_RESOURCE_DATA_CHANGED);
      }

      return (
        isUnchanged &&
        this.$store.state.managementStore.hasNewlyCreatedResource === false
      );
    },
    saveFunction() {
      if (this.$store.state.managementStore.hasNewlyCreatedResource === true) {
         this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "addFunction",
            new AddFunctionRequest(
              this.$store.state.managementStore.selectedFunction.id,
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
            "updateFunction",
            new UpdateFunctionRequest(
              this.$store.state.managementStore.selectedFunction.id,
              this.editedName == null
                ? this.$store.state.managementStore.selectedFunction.name
                : this.editedName
            )
          )
        );
      }
      this.$store.dispatch(A.CHANGES_SAVED);
    }
  }
};
</script>
<style src="./addFunctionForm.css"></style>
