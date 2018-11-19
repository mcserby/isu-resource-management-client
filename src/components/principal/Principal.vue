<template>
  <div class="principal">
    <h1>Modulul Principal</h1>
    <div class="units-container">
      <div class="unit-wrapper" v-for="unit in units" v-bind:key="unit.name">
        <Unit :unit="unit"></Unit>
      </div>
    </div>

    <AddResourceForm :unit="unit" v-if="displayResourceForm"/>
  </div>
</template>
<script>
import Unit from './unit/Unit.vue';
import AddResourceForm from './unit/form/AddResourceForm.vue';
import A from '../../constants/actions';
import WebsocketSubscribe from '../../contracts/websocketSubscribe';

export default {
  name: 'Principal',
  components: {
    Unit,
    AddResourceForm,
  },
  data: () => {
    return {
      lockedUnit: '',
    }
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
      console.log(r);
    }

    let onLockSubUnitError = function(error) {
      console.err(error);
    }

    this.$store.dispatch(A.WEBSOCKET_SUBSCRIBE, new WebsocketSubscribe('subunits', onUnitsReceived, onError));
    this.$store.dispatch(A.WEBSOCKET_SUBSCRIBE, new WebsocketSubscribe('lockSubUnitNotification', onLockSubUnitReceived, onLockSubUnitError));
  }
}
</script>

<style src="./principal.css"></style>
