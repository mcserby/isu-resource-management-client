<template>
  <div>
    <div class="form-group add-function-form">
      <label class="form-label" for="name">Numele funcției</label>
      <input type="text" required v-model="name" class="form-control" id="name">
    </div>
    <button type="button" class="btn custom-button add-function-button" @click="save">Salvează</button>
  </div>
</template>
<script>
import Unit from "../../../contracts/unit";

export default {
  name: "AddFunctionForm",
  data: () => {
    return {};
  },
  computed: {
    name() {
      return this.$store.state.managementStore.selectedFunction.name;
    }
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
<style src="./addFunctionForm.css"></style>
