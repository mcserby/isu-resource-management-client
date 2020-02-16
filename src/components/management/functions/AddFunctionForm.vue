<template>
  <div>
    <div class="form-group add-function-form">
      <label class="form-label" for="name">Numele funcției</label>
      <input
        type="text"
        :disabled="nameEditDisabled"
        required
        v-model="name"
        class="form-control"
        id="name"
        @input="validateFields()"
      >
    </div>
    <div class="errors-add-function" v-if="errors.length>0">
      <div v-for="error in errors" v-bind:key="error">
        <p class="error">{{error}}</p>
      </div>
    </div>
    <button
      type="button"
      class="btn custom-button add-function-button"
      @click="saveFunction"
      :disabled="isSaveDisabled()"
    >Salvează</button>
  </div>
</template>
<script>
import UpdateFunctionRequest from "../../../contracts/management/functions/updateFunctionRequest";
import AddFunctionRequest from "../../../contracts/management/functions/addFunctionRequest";
import DeleteFunctionRequest from "../../../contracts/management/functions/deleteFunctionRequest";
import A from "../../../constants/actions";
import WebsocketSend from "../../../contracts/websocketSend";

export default {
  name: "AddFunctionForm",
  data: () => {
    return { errors: [], editedName: null };
  },
  computed: {
    nameEditDisabled() {
      return this.$store.state.managementStore.managedFunctions.length === 0;
    },
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
        this.$store.dispatch(A.SELECTED_RESOURCE_DATA_CHANGED);
      }
    }
  },
  methods: {
    isSaveDisabled() {
      return (
        !this.$store.state.managementStore.hasUnsavedChanges ||
        (this.$store.state.managementStore.hasUnsavedChanges &&
          this.isInvalidEditedName())
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
    },
    isInvalidEditedName() {
      return this.editedName != null && this.editedName.trim().length === 0;
    },
    validateFields() {
      this.errors.splice(0, this.errors.length);
      if (this.isInvalidEditedName()) {
        this.errors.push(
          "Numele funcției trebuie să conțină cel puțin un caracter."
        );
      }
    }
  }
};
</script>
<style src="./addFunctionForm.css"></style>
