<template>
  <div class="dialogContainer" style="display: block">
    <div class="dialog modal" role="dialog">
      <div class="modal-dialog modal-dialog-centered add-resource-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Adaugă echipament</h5>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label" for="equipmentType">Tip echipament</label>
              <input type="text"  minlength="1" required v-model="equipmentType" class="form-control" id="equipmentType" aria-describedby="nameHelp" @input="validateFields()" placeholder="tip">
            </div>
            <div class="form-group">
              <label class="form-label" for="usable">Operațional</label>
              <input type="number" required v-model="usable"  class="form-control" id="usable">
            </div>
            <div class="form-group">
              <label class="form-label" for="reserves">Rezervă</label>
              <input type="number" required v-model="reserves" class="form-control" id="reserves">
            </div>
            <div class="form-group">
              <label class="form-label" for="unusable">Neoperațional</label>
              <input type="number" required v-model="unusable" class="form-control"  id="unusable"/>
            </div>
            <div v-for="error in errors" v-bind:key="error">
              <p class="error">{{error}}</p>
            </div>

          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn custom-button"
              @click="saveAndAddAnother"
              :disabled="saveDisabled"
            >
              Salvează și adaugă un echipament
            </button>
            <button
              type="button"
              class="btn custom-button"
              @click="saveAndClose"
              :disabled="saveDisabled"
            >
              Salvează și închide
            </button>
            <button
              type="button"
              class="btn custom-button"
              @click="cancel"
            >
              Închide fără a salva
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import A from '../../../../constants/actions';
  import UnlockSubUnitRequest from '../../../../contracts/edit/unlockSubUnitRequest';
  import WebsocketSend from '../../../../contracts/websocketSend';
  import UpdateSubUnitRequest from '../../../../contracts/edit/updateSubUnitRequest';
  import Equipment from '../../../../contracts/equipment'

  export default {
    name: 'AddResourceForm',
    data: () => {
      return {
        errors: [],
        equipmentType: '',
        usable: 0,
        unusable: 0,
        reserves: 0,
        validationPerformedAtLeastOnce: false,
      }
    },
    components: {
      Equipment,
      UnlockSubUnitRequest,
      WebsocketSend,
      UpdateSubUnitRequest
    },
    computed: {
      saveDisabled() {
        return this.errors.length !== 0 || !this.validationPerformedAtLeastOnce;
      },
      resourceType() {
        return this.$store.state.principalStore.activeTab.resourceType;
      }
    },
    mounted(){
      this.validateFields();
    },
    methods: {
      saveAndAddAnother(){
        this.addEquipment();
        this.clearFormValues();
      },
      saveAndClose(){
        this.addEquipment();
        this.clearFormValues();
        this.closeAddResourceDialog();
        this.updateUnit();
      },
      cancel(){
        this.closeAddResourceDialog();
        this.updateUnit();
      },
      addEquipment() {
        this.$store.dispatch(A.ADD_RESOURCE, new Equipment(window.crypto.getRandomValues(new Uint32Array(4)).join('-'), this.equipmentType, this.usable, this.reserves, this.unusable, this.resourceType));
      },
      clearFormValues(){
        this.validationPerformedAtLeastOnce = false;
        this.name = this.plateNumber = this.identificationNumber = this.crew = '';
        this.errors = [];
      },
      closeAddResourceDialog(){
        this.$store.dispatch(A.WEBSOCKET_SEND, new WebsocketSend('unlockSubUnit', new UnlockSubUnitRequest(this.$store.state.principalStore.activeUnit.name)));
        this.$store.dispatch(A.CLOSE_ADD_RESOURCE_DIALOG);
      },
      updateUnit(){
        console.log('updateUnit', this.$store.state.principalStore.activeUnit);
        this.$store.dispatch(A.WEBSOCKET_SEND, new WebsocketSend('updateSubUnit', new UpdateSubUnitRequest(this.$store.state.principalStore.activeUnit)));
      },
      validateFields() {
        this.validationPerformedAtLeastOnce = true;
        this.errors.splice(0, this.errors.length);
        if(this.equipmentType.length < 1){
          this.errors.push("Tipul echipamentului e obligatoriu");
        }

      },
    },
  }
</script>
<style src="./addResourceForm.css"></style>
