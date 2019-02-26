<template>
  <div>
    <div class="form-group add-truck-form">
      <label class="form-label" for="name">Numele scurt</label>
      <input type="text" required v-model="shortName" class="form-control" id="shortName">
      <label class="form-label" for="name">Numele lung</label>
      <input type="text" required v-model="name" class="form-control" id="name">
    </div>
    <button type="button" class="btn custom-button add-truck-button" @click="save">Salvează</button>
  </div>
</template>
<script>
import Unit from "../../../contracts/unit";

export default {
  name: "AddTruckForm",
  data: () => {
    return {
      shortName: "",
      name: ""
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
