<template>
  <div class="principal app-sa">
    <Header title="Principal" :displaySearchBar="true"
            :initial-search-text="initialSearchText"
            :search-bar-placeholder="'Caută după cheia misiunii'" v-on:text="onSearchTextChanged"></Header>
    <ul class="nav nav-tabs">
      <li class="nav-item" v-for="tab in tabs">
        <template class="nav-item">
          <a :class="tabClass(tab.name)" class="tab-text" @click="changeTab(tab)">{{tab.name}}</a>
        </template>
      </li>
    </ul>
    <div class="units-container">
      <div class="unit-header-wrapper">
        <div v-for="unit in units" v-bind:key="unit.id">
          <div class="unit-header">{{unit.name}}</div>
        </div>
      </div>
      <div class="unit-wrapper-wrapper">
        <div class="unit-wrapper" v-for="unit in units" v-bind:key="unit.id">
          <Unit :unit="unit"></Unit>
        </div>
      </div>
    </div>
    <div class="unit-buttons-container">
      <div class="unit-buttons-wrapper" v-for="unit in units" v-bind:key="unit.id">
        <UnitButtons :unit="unit"></UnitButtons>
      </div>
    </div>
    <ConfirmationDialog
      v-if="displayConfirmationDialog"
      :title="confirmationDialogTitle"
      :text="confirmationDialogText"
      @confirm="onConfirm"
      @cancel="onCancel"
    ></ConfirmationDialog>
    <ResourceDialog v-if="displayViewResourceDialog" :resource="activeResource" :unit="activeUnit"></ResourceDialog>
    <EquipmentDialog v-if="displayEquipmentForm" :equipment="activeEquipment" :unit="activeUnit"></EquipmentDialog>
    <AddResourceForm v-if="displayResourceForm"></AddResourceForm>
    <AddEquipmentForm v-if="displayAddEquipmentForm"></AddEquipmentForm>
  </div>
</template>

<script>
import Unit from "./unit/Unit.vue";
import ConfirmationDialog from "../common/ConfirmationDialog.vue";
import AddResourceForm from "./unit/form/AddResourceForm.vue";
import A from "../../constants/actions";
import WebsocketSubscribe from "../../contracts/websocketSubscribe";
import WebsocketSend from "../../contracts/websocketSend";
import UnitButtons from "./unit/buttons/UnitButtons.vue";
import ResourceDialog from "./unit/form/ResourceDialog";
import Header from "../common/header/Header.vue";
import UpdateSubUnitRequest from "../../contracts/edit/updateSubUnitRequest";
import UnlockSubUnitRequest from "../../contracts/edit/unlockSubUnitRequest";
import AddEquipmentForm from "./unit/form/AddEquipmentForm.vue";
import EquipmentDialog from "./unit/form/EquipmentDialog";

export default {
  name: "Principal",
  components: {
    EquipmentDialog,
    Header,
    ResourceDialog,
    Unit,
    ConfirmationDialog,
    AddResourceForm,
    AddEquipmentForm,
    UnitButtons
  },
  data: () => {
    return {
      confirmationDialogTitle: "Schimb de tură",
    };
  },
  computed: {
    initialSearchText() {
      return this.$store.state.principalStore.searchText;
    },
    units() {
      return this.$store.state.principalStore.units;
    },
    tabs() {
      return this.$store.state.principalStore.tabs;
    },
    activeTab() {
      return this.$store.state.principalStore.activeTab;
    },
    resourceType() {
      return this.$store.state.principalStore.activeTab.resourceType;
    },
    activeUnit() {
      return this.$store.state.principalStore.activeUnit;
    },
    activeResource() {
      return this.$store.state.principalStore.activeResource;
    },
    activeEquipment() {
      return this.$store.state.principalStore.activeEquipment;
    },
    displayResourceForm() {
      return this.$store.state.principalStore.resourceDialogIsOpen;
    },
    displayEquipmentForm() {
      return this.$store.state.principalStore.equipmentDialogIsOpen;
    },
    displayAddEquipmentForm() {
      return this.$store.state.principalStore.addEquipmentDialogIsOpen;
    },
    displayConfirmationDialog() {
      return this.$store.state.principalStore.confirmationDialogIsOpen;
    },
    displayViewResourceDialog() {
      return this.$store.state.principalStore.resourceViewDialogIsOpen;
    },
    confirmationDialogText() {
      return (
        "Sunteți sigur că doriți să ștergeți toate datele pentru detașamentul " +
        this.activeUnit.name
      );
    }
  },
  methods: {
    changeTab(tab) {
      this.$store.dispatch(A.CHANGE_ACTIVE_TAB, tab);
    },
    tabClass: function(tabName) {
      return [
        "nav-link",
        "btn",
        tabName === this.activeTab.name ? "active" : ""
      ].join(" ");
    },
    onSearchTextChanged(value){
      this.$store.dispatch(A.APPLY_RESOURCE_FILTER, value);
    },
    onConfirm() {
      this.$store.dispatch(A.CLOSE_CONFIRMATION_DIALOG);
      this.$store.dispatch(A.UNLOCK_SUBUNIT_PENDING);
      this.$store.dispatch(
        A.CLEAR_UNIT_RESOURCES,
        this.$store.state.principalStore.activeUnit.id
      );
      this.$store.dispatch(
        A.WEBSOCKET_SEND,
        new WebsocketSend(
          "updateSubUnit",
          new UpdateSubUnitRequest(this.$store.state.principalStore.activeUnit)
        )
      );
    },
    onCancel() {
      this.$store.dispatch(
        A.WEBSOCKET_SEND,
        new WebsocketSend(
          "unlockSubUnit",
          new UnlockSubUnitRequest(
            this.$store.state.principalStore.activeUnit.id,
            this.resourceType
          )
        )
      );
      this.$store.dispatch(A.CLOSE_CONFIRMATION_DIALOG);
    }
  },
  mounted: function() {
    console.log("Principal.vue mounted");
    const self = this;

    let onLockSubUnitResponseReceived = function(response) {
      let r = JSON.parse(response.body);
      self.$store.dispatch(A.LOCK_UNIT_RESPONSE_RECEIVED, r);
    };

    let onLockSubUnitReceived = function(response) {
      let r = JSON.parse(response.body);
      self.$store.dispatch(A.LOCK_UNIT, r);
    };

    let onUnLockSubUnitReceived = function(response) {
      let r = JSON.parse(response.body);
      self.$store.dispatch(A.UNLOCK_UNIT, r);
    };

    let onUpdateSubUnitResponseReceived = function(response) {
      self.$store.dispatch(A.UNLOCK_SUBUNIT_NOT_PENDING);
      self.$store.dispatch(
        A.WEBSOCKET_SEND,
        new WebsocketSend(
          "unlockSubUnit",
          new UnlockSubUnitRequest(
            self.$store.state.principalStore.activeUnit.id,
            self.resourceType
          )
        )
      );
    };

    let onError = function(error) {
      console.err(error);
    };


    this.$store.dispatch(
      A.WEBSOCKET_SUBSCRIBE,
      new WebsocketSubscribe(
        "lockSubUnitNotification",
        onLockSubUnitReceived,
        onError
      )
    );

    this.$store.dispatch(
      A.WEBSOCKET_SUBSCRIBE_USER,
      new WebsocketSubscribe(
        "lockSubUnitResponse",
        onLockSubUnitResponseReceived,
        onError
      )
    );

    this.$store.dispatch(
      A.WEBSOCKET_SUBSCRIBE_USER,
      new WebsocketSubscribe(
        "updateSubUnitResponse",
        onUpdateSubUnitResponseReceived,
        onError
      )
    );

    this.$store.dispatch(
      A.WEBSOCKET_SUBSCRIBE,
      new WebsocketSubscribe(
        "unlockSubUnitNotification",
        onUnLockSubUnitReceived,
        onError
      )
    )

  }

};
</script>

<style src="./principal.css"></style>
