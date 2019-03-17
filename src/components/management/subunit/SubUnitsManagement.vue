<template>
  <div class="subunits-management-container">
    <SubUnitsList class="subunits-list"></SubUnitsList>
    <AddSubUnitForm class="add-subunit-form" :key="getKey()"></AddSubUnitForm>
  </div>
</template>

<script>
import Unit from "../../principal/unit/Unit.vue";
import A from "../../../constants/actions";
import SubUnitsList from "./SubUnitsList.vue";
import AddSubUnitForm from "./AddSubUnitForm.vue";

export default {
  name: "SubUnitsManagement",
  components: { SubUnitsList, AddSubUnitForm },
  data: () => {
    return {};
  },
  computed: {},
  methods: {
    getKey() {
      if (this.$store.state.managementStore.selectedSubUnit != null) {
        return this.$store.state.managementStore.selectedSubUnit.id;
      }
    }
  },
  mounted: function() {
    console.log("SubUnitsManagement module mounted");
  }
};
</script>

<style src="./subUnitsManagement.css"></style>
