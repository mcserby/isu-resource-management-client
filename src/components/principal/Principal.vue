<template>
  <div class="principal">
    <h1>Modulul Principal</h1>
    <div class="units-container">
      <div class="unit-wrapper" v-for="unit in units" v-bind:key="unit.id">
        <Unit :unit="unit"></Unit>
      </div>
    </div>
    <AddResourceForm v-if="displayResourceForm"/>
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
    let onUnitsReceived = function(response){
      console.log(response);
    }
    let onError = function(error){
      console.err(error);
    }
    this.$store.dispatch(A.WEBSOCKET_SUBSCRIBE, new WebsocketSubscribe('subunits', onUnitsReceived, onError));
  }
}
</script>

<style src="./principal.css"></style>
