<template>
  <div>
    <div class="form-group add-truck-form">
      <label class="form-label" for="name">Numele scurt</label>
      <input type="text" required v-model="shortName" class="form-control" id="shortName">
      <label class="form-label" for="name">Numele lung</label>
      <input type="text" required v-model="longName" class="form-control" id="longName">
    </div>
    <button type="button" class="btn custom-button add-truck-button" @click="saveTruck">Salvează</button>
  </div>
</template>
<script>
import UpdateTruckRequest from "../../../contracts/management/trucks/updateTruckRequest";
import A from "../../../constants/actions";
import WebsocketSend from "../../../contracts/websocketSend";

export default {
  name: "AddTruckForm",
  computed: {
    shortName: {
      // getter
      get: function() {
        if (this.$store.state.managementStore.selectedTruck != null) {
          return this.$store.state.managementStore.selectedTruck.shortName;
        } else {
          return "";
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
        if (this.$store.state.managementStore.selectedTruck != null) {
          return this.$store.state.managementStore.selectedTruck.longName;
        } else {
          return "";
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
    saveTruck() {
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
  }
};
</script>
<style src="./addTruckForm.css"></style>
