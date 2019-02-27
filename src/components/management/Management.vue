<template>
  <div>
    <ManagementHeader></ManagementHeader>
    <div class="managed-resources-grid">
      <div class="managed-resource-type">Tipul de resursă</div>
      <div class="managed-resource-types">
        <div class="resource-types">
          <div
            :class="getSelectedResourceClass(ManagedResourceType.SUBUNITS)"
            class="resource-type resource-type-subunit"
            @click="selectResourceType(ManagedResourceType.SUBUNITS)"
          >Subunități</div>
          <div
            :class="getSelectedResourceClass(ManagedResourceType.FUNCTIONS)"
            class="resource-type resource-type-function"
            @click="selectResourceType(ManagedResourceType.FUNCTIONS)"
          >Funcții</div>
          <div
            :class="getSelectedResourceClass(ManagedResourceType.TRUCKS)"
            class="resource-type resource-type-auto"
            @click="selectResourceType(ManagedResourceType.TRUCKS)"
          >Tipuri de autospeciale</div>
        </div>
      </div>
      <div class="managed-resources-list-buttons">
        <button
          type="button"
          class="btn custom-resource-management-button add-resource-button"
          @click="addResource"
        >Adaugă</button>
        <button
          type="button"
          class="btn custom-resource-management-button delete-resource-button"
          @click="deleteResource"
        >Șterge</button>
      </div>
      <div class="managed-resources-details">Editare resursă</div>
      <div class="managed-resources">
        <SubUnitsManagement v-if="isSelectedResource(ManagedResourceType.SUBUNITS)"></SubUnitsManagement>
        <FunctionsManagement v-if="isSelectedResource(ManagedResourceType.FUNCTIONS)"></FunctionsManagement>
        <TrucksManagement v-if="isSelectedResource(ManagedResourceType.TRUCKS)"></TrucksManagement>
      </div>
    </div>
  </div>
</template>

<script>
import ManagementHeader from "./header/ManagementHeader.vue";
import SubUnitsManagement from "./subunit/SubUnitsManagement.vue";
import FunctionsManagement from "./functions/FunctionsManagement.vue";
import TrucksManagement from "./trucks/TrucksManagement.vue";
import A from "../../constants/actions";
import ManagedResourceType from "../../constants/managedResourceType";
import DeleteFunctionRequest from "../../contracts/management/functions/DeleteFunctionRequest";
import DeleteSubUnitRequest from "../../contracts/management/subunits/DeleteSubUnitRequest";
import DeleteTruckRequest from "../../contracts/management/trucks/DeleteTruckRequest";
import WebsocketSend from "../../contracts/websocketSend";

export default {
  name: "Management",
  components: {
    ManagementHeader,
    FunctionsManagement,
    SubUnitsManagement,
    TrucksManagement
  },
  props: [],
  data: () => {
    return { ManagedResourceType: ManagedResourceType };
  },
  computed: {
    selectedResourceType() {
      return this.$store.state.managementStore.selectedResourceType;
    }
  },
  methods: {
    isSelectedResource(resourceType) {
      return (
        this.$store.state.managementStore.selectedResourceType === resourceType
      );
    },
    getSelectedResourceClass(resourceType) {
      return [
        this.$store.state.managementStore.selectedResourceType === resourceType
          ? "resource-type-selected"
          : ""
      ];
    },
    selectResourceType(resourceTypeToSelect) {
      this.$store.dispatch(
        A.SELECT_MANAGED_RESOURCE_TYPE,
        resourceTypeToSelect
      );
    },
    addResource() {
      this.$store.dispatch(A.ADD_MANAGED_RESOURCE);
    },
    deleteResource() {
      switch (this.$store.state.managementStore.selectedResourceType) {
        case ManagedResourceType.SUBUNITS:
          this.deleteSubUnit();
          break;
        case ManagedResourceType.FUNCTIONS:
          this.deleteFunction();
          break;
        case ManagedResourceType.TRUCKS:
          this.deleteTruck();
          break;
      }
    },
    deleteFunction() {
      let functionId = this.$store.state.managementStore.selectedFunction.id;
      if (functionId != null) {
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "deleteFunction",
            new DeleteFunctionRequest(functionId)
          )
        );
      }
      this.$store.dispatch(
        A.DELETE_MANAGED_RESOURCE,
        this.$store.state.managementStore.managedFunctions[0]
      );
    },
    deleteSubUnit() {
      let subUnitId = this.$store.state.managementStore.selectedSubUnit.id;
      if (subUnitId != null) {
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "deleteSubUnit",
            new DeleteSubUnitRequest(subUnitId)
          )
        );
      }
      this.$store.dispatch(
        A.DELETE_MANAGED_RESOURCE,
        this.$store.state.managementStore.managedSubUnits[0]
      );
    },
    deleteTruck() {
      let truckId = this.$store.state.managementStore.selectedTruck.id;
      if (truckId != null) {
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend("deleteTruck", new DeleteTruckRequest(truckId))
        );
      }
      this.$store.dispatch(
        A.DELETE_MANAGED_RESOURCE,
        this.$store.state.managementStore.managedTrucks[0]
      );
    }
  },
  mounted: function() {
    console.log("ResourceManagement module mounted");
  }
};
</script>
<style src="./management.css"></style>
