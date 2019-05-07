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
            :class="getSelectedResourceClass(ManagedResourceType.VEHICLE_TYPES)"
            class="resource-type resource-type-auto"
            @click="selectResourceType(ManagedResourceType.VEHICLE_TYPES)"
          >Tipuri de autospeciale</div>
        </div>
      </div>
      <div class="managed-resources-list-buttons">
        <button
          type="button"
          class="btn custom-resource-management-button"
          @click="addResource"
          :disabled="isAddingDisabled()"
        >Adaugă</button>
        <button
          type="button"
          class="btn custom-resource-management-button"
          @click="openConfirmationDialog"
        >Șterge</button>
      </div>
      <div class="managed-resources-details">Editare resursă</div>
      <div class="managed-resources">
        <SubUnitsManagement v-if="isSelectedResource(ManagedResourceType.SUBUNITS)"></SubUnitsManagement>
        <FunctionsManagement v-if="isSelectedResource(ManagedResourceType.FUNCTIONS)"></FunctionsManagement>
        <VehicleTypesManagement v-if="isSelectedResource(ManagedResourceType.VEHICLE_TYPES)"></VehicleTypesManagement>
      </div>
    </div>
    <ConfirmationDialog
      v-if="displayConfirmationDialog"
      :title="confirmationDialogTitle"
      :text="confirmationDialogText()"
      @confirm="onConfirm"
      @cancel="onCancel"
    ></ConfirmationDialog>
    <ConfirmationDialog
      v-if="showUnsavedChangesDialog"
      :title="unsavedChangesTitle"
      :text="unsavedChangesText"
      @confirm="onConfirmUnsaved"
      @cancel="onCancelUnsaved"
    ></ConfirmationDialog>
  </div>
</template>

<script>
import ManagementHeader from "./header/ManagementHeader.vue";
import SubUnitsManagement from "./subunit/SubUnitsManagement.vue";
import FunctionsManagement from "./functions/FunctionsManagement.vue";
import VehicleTypesManagement from "./vehicles/VehicleTypesManagement.vue";
import A from "../../constants/actions";
import ManagedResourceType from "../../constants/managedResourceType";
import DeleteFunctionRequest from "../../contracts/management/functions/DeleteFunctionRequest";
import DeleteSubUnitRequest from "../../contracts/management/subunits/DeleteSubUnitRequest";
import DeleteVehicleTypeRequest from "../../contracts/management/vehicles/DeleteVehicleTypeRequest";
import WebsocketSend from "../../contracts/websocketSend";
import ConfirmationDialog from "../common/ConfirmationDialog.vue";

export default {
  name: "Management",
  components: {
    ManagementHeader,
    FunctionsManagement,
    SubUnitsManagement,
    VehicleTypesManagement,
    ConfirmationDialog
  },
  props: [],
  data: () => {
    return {
      ManagedResourceType: ManagedResourceType,
      confirmationDialogTitle: "Ștergere resursă",
      unsavedChangesTitle: "Modificări nesalvate"
    };
  },
  computed: {
    selectedResourceType() {
      return this.$store.state.managementStore.selectedResourceType;
    },
    displayConfirmationDialog() {
      return this.$store.state.principalStore.confirmationDialogIsOpen;
    },
    showUnsavedChangesDialog() {
      return this.$store.state.managementStore.showUnsavedChangesDialog;
    },
    unsavedChangesText() {
      return "Aveți modificări nesalvate. Sunteți sigur ca doriți să părăsiți pagina";
    }
  },
  methods: {
    confirmationDialogText() {
      switch (this.$store.state.managementStore.selectedResourceType) {
        case ManagedResourceType.SUBUNITS:
          return (
                   "Serviciul și toate resursele asignate serviciului vor fi șterse. Sunteți sigur că doriți să ștergeți : " +
            this.$store.state.managementStore.selectedSubUnit.name
          );
          break;
        case ManagedResourceType.FUNCTIONS:
          return (
            "Sunteți sigur că doriți să ștergeți : " +
            this.$store.state.managementStore.selectedFunction.name
          );
          break;
        case ManagedResourceType.VEHICLE_TYPES:
          return (
            "Sunteți sigur că doriți să ștergeți : " +
            this.$store.state.managementStore.selectedVehicleType.shortName
          );
          break;
      }
    },
    isAddingDisabled() {
      return this.$store.state.managementStore.hasUnsavedChanges;
    },
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
    openConfirmationDialog() {
      this.$store.dispatch(A.OPEN_CONFIRMATION_DIALOG);
    },
    onConfirm() {
      this.deleteResource();
      this.$store.dispatch(A.CLOSE_CONFIRMATION_DIALOG);
    },
    onCancel() {
      this.$store.dispatch(A.CLOSE_CONFIRMATION_DIALOG);
    },
    onConfirmUnsaved() {
      this.$store.dispatch(A.CHANGES_REVERTED);
      this.$store.dispatch(A.HIDE_UNSAVED_CHANGES_DIALOG);
    },
    onCancelUnsaved() {
      this.$store.dispatch(A.HIDE_UNSAVED_CHANGES_DIALOG);
    },
    getResourceToDelete() {
      switch (this.$store.state.managementStore.selectedResourceType) {
        case ManagedResourceType.SUBUNITS:
          return this.$store.state.managementStore.selectedSubUnit.name;
          break;
        case ManagedResourceType.FUNCTIONS:
          return this.$store.state.managementStore.selectedFunction.name;
          break;
        case ManagedResourceType.VEHICLE_TYPES:
          return this.$store.state.managementStore.selectedVehicleType
            .shortName;
          break;
      }
    },
    deleteResource() {
      switch (this.$store.state.managementStore.selectedResourceType) {
        case ManagedResourceType.SUBUNITS:
          this.deleteSubUnit();
          break;
        case ManagedResourceType.FUNCTIONS:
          this.deleteFunction();
          break;
        case ManagedResourceType.VEHICLE_TYPES:
          this.deleteVehicleType();
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
    deleteVehicleType() {
      let vehicleTypeId = this.$store.state.managementStore.selectedVehicleType
        .id;
      if (vehicleTypeId != null) {
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "deleteVehicleType",
            new DeleteVehicleTypeRequest(vehicleTypeId)
          )
        );
      }
      this.$store.dispatch(
        A.DELETE_MANAGED_RESOURCE,
        this.$store.state.managementStore.managedVehicleTypes[0]
      );
    }
  },
  mounted: function() {
    console.log("ResourceManagement module mounted");
  }
};
</script>
<style src="./management.css"></style>
