<template>
  <div>
    <div class="form-group add-vehicle-form">
      <label class="form-label" for="shortName">Numele scurt</label>
      <input
        type="text"
        :disabled="nameEditDisabled"
        required
        v-model="shortName"
        class="form-control"
        id="shortName"
        @input="validateFields()"
      >
      <label class="form-label" for="longName">Numele lung</label>
      <input
        type="text"
        :disabled="nameEditDisabled"
        required
        v-model="longName"
        class="form-control"
        id="longName"
        @input="validateFields()"
      >
    </div>
    <div class="errors-add-vehicle" v-if="errors.length>0">
      <div v-for="error in errors" v-bind:key="error">
        <p class="error">{{error}}</p>
      </div>
    </div>
    <button
      type="button"
      class="btn custom-button add-vehicle-button"
      @click="saveVehicleType"
      :disabled="isSaveDisabled()"
    >Salvează</button>
  </div>
</template>
<script>
import UpdateVehicleTypeRequest from "../../../contracts/management/vehicles/updateVehicleTypeRequest";
import AddVehicleTypeRequest from "../../../contracts/management/vehicles/addVehicleTypeRequest";
import A from "../../../constants/actions";
import WebsocketSend from "../../../contracts/websocketSend";

export default {
  name: "AddVehicleTypeForm",
  computed: {
    nameEditDisabled() {
      return this.$store.state.managementStore.managedVehicleTypes.length === 0;
    },
    shortName: {
      // getter
      get: function() {
        if (this.editedShortName != null) {
          return this.editedShortName;
        } else if (this.$store.state.managementStore.selectedVehicleType != null) {
          return this.$store.state.managementStore.selectedVehicleType.shortName;
        } else {
          return null;
        }
      },
      // setter
      set: function(newValue) {
        this.editedShortName = newValue;
        this.$store.dispatch(A.SELECTED_RESOURCE_DATA_CHANGED);
      }
    },
    longName: {
      // getter
      get: function() {
        if (this.editedLongName != null) {
          return this.editedLongName;
        } else if (this.$store.state.managementStore.selectedVehicleType != null) {
          return this.$store.state.managementStore.selectedVehicleType.longName;
        } else {
          return null;
        }
      },
      // setter
      set: function(newValue) {
        this.editedLongName = newValue;
        this.$store.dispatch(A.SELECTED_RESOURCE_DATA_CHANGED);
      }
    }
  },
  data: () => {
    return {
      errors: [],
      editedShortName: null,
      editedLongName: null
    };
  },
  methods: {
    isSaveDisabled() {
      return (
        !this.$store.state.managementStore.hasUnsavedChanges ||
        ((this.$store.state.managementStore.hasUnsavedChanges &&
          this.isInvalidEditedShortName()) ||
          this.isInvalidEditedLongName())
      );
    },
    saveVehicleType() {
      if (this.$store.state.managementStore.hasNewlyCreatedResource === true) {
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "addVehicleType",
            new AddVehicleTypeRequest(
              this.$store.state.managementStore.selectedVehicleType.id,
              this.editedShortName == null
                ? this.$store.state.managementStore.selectedVehicleType.shortName
                : this.editedShortName,
              this.editedLongName === null
                ? this.$store.state.managementStore.selectedVehicleType.longName
                : this.editedLongName
            )
          )
        );
      } else {
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "updateVehicleType",
            new UpdateVehicleTypeRequest(
              this.$store.state.managementStore.selectedVehicleType.id,
              this.editedShortName == null
                ? this.$store.state.managementStore.selectedVehicleType.shortName
                : this.editedShortName,
              this.editedLongName === null
                ? this.$store.state.managementStore.selectedVehicleType.longName
                : this.editedLongName
            )
          )
        );
      }

      this.$store.dispatch(A.CHANGES_SAVED);
    },
    isInvalidEditedShortName() {
      return (
        this.editedShortName != null && this.editedShortName.trim().length === 0
      );
    },
    isInvalidEditedLongName() {
      return (
        this.editedLongName != null && this.editedLongName.trim().length === 0
      );
    },
    validateFields() {
      this.errors.splice(0, this.errors.length);
      if (this.isInvalidEditedShortName()) {
        this.errors.push(
          "Numele scurt trebuie să conțină cel puțin un caracter."
        );
      }
      if (this.isInvalidEditedLongName()) {
        this.errors.push(
          "Numele lung trebuie să conțină cel puțin un caracter."
        );
      }
    }
  }
};
</script>
<style src="./addVehicleTypeForm.css"></style>
