<template>
  <div class="principal app-sa">
    <h1 class="principal-title">Situația curentă a resurselor pe detașamente</h1>
    <div class="units-container">
      <div class="unit-wrapper" v-for="unit in units" v-bind:key="unit.name">
        <Unit :unit="unit"></Unit>
      </div>
    </div>
    <div class="unit-buttons-container">
      <div class="unit-buttons-wrapper" v-for="unit in units" v-bind:key="unit.name">
        <UnitButtons :unit="unit"></UnitButtons>
      </div>
    </div>
    <ConfirmationDialog v-if="displayConfirmationDialog" :unit="activeUnit"></ConfirmationDialog>
    <ResourceDialog v-if="displayViewResourceDialog" :resource="activeResource" :unitName="activeUnitName"></ResourceDialog>
    <AddResourceForm v-if="displayResourceForm" ></AddResourceForm>
  </div>
</template>

<script>
import Unit from './unit/Unit.vue';
import ConfirmationDialog from './unit/form/ConfirmationDialog.vue';
import AddResourceForm from './unit/form/AddResourceForm.vue';
import A from '../../constants/actions';
import WebsocketSubscribe from '../../contracts/websocketSubscribe';
import UnitButtons from './unit/buttons/UnitButtons.vue';
import ResourceDialog from './unit/form/ResourceDialog'

export default {
  name: 'Principal',
  components: {
    ResourceDialog,
    Unit,
    ConfirmationDialog,
    AddResourceForm,
    UnitButtons
  },
  computed: {
    units() {
      return this.$store.state.principalStore.units;
    },
    activeUnit() {
      return this.$store.state.principalStore.activeUnit;
    },
    activeUnitName() {
      return this.$store.state.principalStore.activeUnit.name;
    },
    activeResource() {
      return this.$store.state.principalStore.activeResource;
    },
    displayResourceForm() {
      return this.$store.state.principalStore.resourceDialogIsOpen;
    },
    displayConfirmationDialog() {
      return this.$store.state.principalStore.confirmationDialogIsOpen;
    },
    displayViewResourceDialog() {
      return this.$store.state.principalStore.resourceViewDialogIsOpen;
    }
  },
  mounted: function () {
    console.log("Principal.vue mounted");
    const self = this;
    let onUnitsReceived = function(response){
      let r = JSON.parse(response.body);
      self.$store.dispatch(A.INIT_UNITS,  r.subUnitsList);
    }

    let onLockSubUnitReceived = function(response){
      let r = JSON.parse(response.body);

      self.$store.dispatch(A.LOCK_UNIT, r.subUnitName);
    }


    let onUnLockSubUnitReceived = function(response){
      let r = JSON.parse(response.body);

      self.$store.dispatch(A.UNLOCK_UNIT, r.subUnitName);
    }

    let onUnitUpdated = function(response){
      let r = JSON.parse(response.body);

      self.$store.dispatch(A.UNIT_UPDATED, r.subUnit);
    }

    let onError = function(error) {
      console.err(error);
    }

    this.$store.dispatch(A.WEBSOCKET_SUBSCRIBE, new WebsocketSubscribe('subunits', onUnitsReceived, onError));
    this.$store.dispatch(A.WEBSOCKET_SUBSCRIBE, new WebsocketSubscribe('lockSubUnitNotification', onLockSubUnitReceived, onError));
    this.$store.dispatch(A.WEBSOCKET_SUBSCRIBE, new WebsocketSubscribe('unlockSubUnitNotification', onUnLockSubUnitReceived, onError));
    this.$store.dispatch(A.WEBSOCKET_SUBSCRIBE, new WebsocketSubscribe('unitUpdatedNotification', onUnitUpdated, onError));
  }
}
</script>

<style src="./principal.css"></style>
