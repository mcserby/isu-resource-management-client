<template>
  <div>
    <div class="form-group add-truck-form">
      <label class="form-label" for="name">Numele scurt</label>
      <input type="text" required v-model="shortName" class="form-control" id="shortName">
      <label class="form-label" for="name">Numele lung</label>
      <input type="text" required v-model="longName" class="form-control" id="longName">
    </div>
    <button
      type="button"
      class="btn custom-button add-truck-button"
      @click="saveTruck"
      :disabled="isSaveDisabled()"
    >Salvează</button>
  </div>
</template>
<script>
import UpdateTruckRequest from "../../../contracts/management/trucks/updateTruckRequest";
import AddTruckRequest from "../../../contracts/management/trucks/addTruckRequest";
import A from "../../../constants/actions";
import WebsocketSend from "../../../contracts/websocketSend";

export default {
  name: "AddTruckForm",
  computed: {
    shortName: {
      // getter
      get: function() {
        if (this.editedShortName != null) {
          return this.editedShortName;
        } else if (this.$store.state.managementStore.selectedTruck != null) {
          return this.$store.state.managementStore.selectedTruck.shortName;
        } else {
          return null;
        }
      },
      // setter
      set: function(newValue) {
        this.editedShortName = newValue;
      }
    },
    longName: {
      // getter
      get: function() {
        if (this.editedLongName != null) {
          return this.editedLongName;
        } else if (this.$store.state.managementStore.selectedTruck != null) {
          return this.$store.state.managementStore.selectedTruck.longName;
        } else {
          return null;
        }
      },
      // setter
      set: function(newValue) {
        this.editedLongName = newValue;
      }
    }
  },
  data: () => {
    return {
      editedShortName: null,
      editedLongName: null
    };
  },
  methods: {
    isSaveDisabled() {
      var isUnchanged =
        (this.editedShortName == null || this.editedShortName === "") &&
        (this.editedLongName == null || this.editedLongName === "");

      if (!isUnchanged) {
        this.$store.dispatch(A.SELECTED_RESOURCE_DATA_CHANGED);
      }

      return (
        isUnchanged &&
        this.$store.state.managementStore.hasNewlyCreatedResource === false
      );
    },
    saveTruck() {
      if (this.$store.state.managementStore.hasNewlyCreatedResource === true) {
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "addTruck",
            new AddTruckRequest(
              this.$store.state.managementStore.selectedTruck.id,
              this.editedShortName == null
                ? this.$store.state.managementStore.selectedTruck.shortName
                : this.editedShortName,
              this.editedLongName === null
                ? this.$store.state.managementStore.selectedTruck.longName
                : this.editedLongName
            )
          )
        );
      } else {
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "updateTruck",
            new UpdateTruckRequest(
              this.$store.state.managementStore.selectedTruck.id,
              this.editedShortName == null
                ? this.$store.state.managementStore.selectedTruck.shortName
                : this.editedShortName,
              this.editedLongName === null
                ? this.$store.state.managementStore.selectedTruck.longName
                : this.editedLongName
            )
          )
        );
      }
      this.$store.dispatch(A.CHANGES_SAVED);
    }
  }
};
</script>
<style src="./addTruckForm.css"></style>
