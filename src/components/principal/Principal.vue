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
    <AddResourceForm v-if="displayResourceForm"></AddResourceForm>
  </div>
</template>

<script>
import Unit from './unit/Unit.vue';
import AddResourceForm from './unit/form/AddResourceForm.vue';
import A from '../../constants/actions';
import WebsocketSubscribe from '../../contracts/websocketSubscribe';
import UnitButtons from './unit/buttons/UnitButtons.vue';

export default {
  name: 'Principal',
  components: {
    Unit,
    AddResourceForm,
    UnitButtons,
  },
  computed: {
    units() {
      return this.$store.state.principalStore.units;
    },
    displayResourceForm() {
      return this.$store.state.principalStore.resourceDialogIsOpen;
    },
  },
  mounted: function () {
    console.log("Principal.vue mounted");
    const self = this;
    let onUnitsReceived = function(response){
      let r = JSON.parse(response.body);
      self.$store.dispatch(A.INIT_UNITS,  r.subUnitsList);
    }
    let onError = function(error){
      console.err(error);
    }

    let onLockSubUnitReceived = function(response){
      let r = JSON.parse(response.body);

      self.$store.dispatch(A.LOCK_UNIT, r.subUnitName);
    }

    let onLockSubUnitError = function(error) {
      console.err(error);
    }

    let onUnLockSubUnitReceived = function(response){
      let r = JSON.parse(response.body);

      self.$store.dispatch(A.UNLOCK_UNIT, r.subUnitName);
    }

    let onUnLockSubUnitError = function(error) {
      console.err(error);
    }

    this.$store.dispatch(A.WEBSOCKET_SUBSCRIBE, new WebsocketSubscribe('subunits', onUnitsReceived, onError));
    this.$store.dispatch(A.WEBSOCKET_SUBSCRIBE, new WebsocketSubscribe('lockSubUnitNotification', onLockSubUnitReceived, onLockSubUnitError));
    this.$store.dispatch(A.WEBSOCKET_SUBSCRIBE, new WebsocketSubscribe('unlockSubUnitNotification', onUnLockSubUnitReceived, onUnLockSubUnitError));
  }
}
</script>

<style src="./principal.css"></style>
