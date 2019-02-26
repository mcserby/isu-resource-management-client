<template>
  <div>
    <div class="form-group add-subunit-form">
      <label class="form-label" for="name">Numele subunității</label>
      <input type="text" required v-model="name" class="form-control" id="name">
    </div>
    <button type="button" class="btn custom-button add-subunit-button" @click="save">Salvează</button>
  </div>
</template>
<script>
import Unit from "../../../contracts/unit";

export default {
  name: "AddSubUnitForm",
  data: () => {
    return {};
  },
  computed: {
    name() {
      return this.$store.state.managementStore.selectedSubUnit;
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
<style src="./addSubUnitForm.css"></style>
