<template>
  <div>
    <div class="form-group add-truck-form">
      <label class="form-label" for="name">Numele scurt</label>
      <input type="text" required v-model="shortName" class="form-control" id="shortName">
      <label class="form-label" for="name">Numele lung</label>
      <input type="text" required v-model="longName" class="form-control" id="longName">
    </div>
    <button type="button" class="btn custom-button add-truck-button" @click="save">Salvează</button>
  </div>
</template>
<script>
import Unit from "../../../contracts/unit";

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
      editedShortName: "",
      editedLongName: ""
    };
  },
  methods: {
    save() {
      this.$emit(
        "saveAndAddAnother",
        new Unit(this.name, [], [], null, null, null)
      );
    }
  }
};
</script>
<style src="./addTruckForm.css"></style>
