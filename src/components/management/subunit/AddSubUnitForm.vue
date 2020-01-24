<template>
  <div>
    <div class="form-group add-subunit-form">
      <label class="form-label" for="name">Numele subunității</label>
      <input
        type="text"
        :disabled="true"
        minlength="1"
        maxlength="10"
        required
        v-model="name"
        class="form-control"
        id="name"
        @input="validateFields()"
      >
    </div>
    <div class="errors-add-subunit" v-if="errors.length>0">
      <div v-for="error in errors" v-bind:key="error">
        <p class="error">{{error}}</p>
      </div>
    </div>
    <button
      type="button"
      class="btn custom-button add-subunit-button"
      @click="save"
      :disabled="saveDisabled"
    >Salvează</button>
  </div>
</template>
<script>
import Unit from "../../../contracts/unit";
import UpdateSubUnitNameRequest from "../../../contracts/management/subunits/updateSubUnitNameRequest";
import AddSubUnitRequest from "../../../contracts/management/subunits/addSubUnitRequest";
import A from "../../../constants/actions";
import WebsocketSend from "../../../contracts/websocketSend";

export default {
  name: "AddSubUnitForm",
  data: () => {
    return { errors: [], editedName: null };
  },
  computed: {
    name: {
      // getter
      get: function() {
        if (this.editedName === null) {
          if (this.$store.state.managementStore.selectedSubUnit != null) {
            return this.$store.state.managementStore.selectedSubUnit.name;
          } else {
            return this.editedName;
          }
        } else {
          return this.editedName;
        }
      },
      // setter
      set: function(newValue) {
        this.editedName = newValue;
        this.$store.dispatch(A.SELECTED_RESOURCE_DATA_CHANGED);
      }
    },
    saveDisabled() {
      return (
        !this.$store.state.managementStore.hasUnsavedChanges ||
        (this.$store.state.managementStore.hasUnsavedChanges &&
          this.isInvalidEditedName())
      );
    }
  },
  methods: {
    save() {
      if (this.$store.state.managementStore.hasNewlyCreatedResource === true) {
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "addSubUnit",
            new AddSubUnitRequest(
              this.$store.state.managementStore.selectedSubUnit.id,
              this.editedName === null
                ? this.$store.state.managementStore.selectedSubUnit.name
                : this.editedName
            )
          )
        );
      } else {
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "updateSubUnitName",
            new UpdateSubUnitNameRequest(
              this.$store.state.managementStore.selectedSubUnit.id,
              this.editedName === null
                ? this.$store.state.managementStore.selectedSubUnit.name
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
          "Numele subunității trebuie să conțină cel puțin un caracter."
        );
      }
    }
  }
};
</script>
<style src="./addSubUnitForm.css"></style>
