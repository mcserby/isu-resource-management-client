<template>
  <div class="truck-management-container">
    <TrucksList class="truck-list"></TrucksList>
    <AddTruckForm class="add-truck-form"></AddTruckForm>
  </div>
</template>

<script>
import Unit from "../../principal/unit/Unit.vue";
import A from "../../../constants/actions";
import TrucksList from "./TrucksList.vue";
import AddTruckForm from "./AddTruckForm.vue";

export default {
  name: "TrucksManagement",
  components: { TrucksList, AddTruckForm },
  data: () => {
    return {};
  },
  computed: {},
  methods: {},
  mounted: function() {
    console.log("TrucksManagement module mounted");
  }
};
</script>

<style src="./trucksManagement.css"></style>