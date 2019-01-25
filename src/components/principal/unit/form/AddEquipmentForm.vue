<template>
  <div class="dialogContainer" style="display: block">
    <div class="dialog modal" role="dialog">
      <div class="modal-dialog modal-dialog-centered add-resource-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Adaugă echipament</h5>
          </div>
          <div class="modal-body body-wrapper">
            <div class="resource-browser-list">
              <div class="resource-browser-resource-summary" v-for="(equipment) in filteredEquipment" v-bind:key="equipment.equipmentId" v-on:click="onResourceClick(equipment)">
                <div class="resource-summary-card">
                  <EquipmentSummary :equipment="equipment" :rowNr="rowColor(equipment)"></EquipmentSummary>
                </div>
                <div class="delete-resource">
                  <button type="button" class="btn custom-close-button" @click="deleteResource(equipment)">X</button>
                </div>
              </div>
              <div class="resource-browser-resource-summary">
                <div class="add-resource-button-wrapper">
                  <button type="button" class="btn custom-button" @click="addNewEquipment()" :disabled="addNewResourceDisabled()">Adaugă echipament</button>
                </div>
              </div>
            </div>

            <div class="resource-editor">
              <div class="form-group">
                <label class="form-label" for="equipmentType">Tip</label>
                <input type="text" minlength="1" required v-model="equipmentType" @input="updateEquipment()" class="form-control" id="equipmentType" aria-describedby="nameHelp" placeholder="Tip">
              </div>
              <div class="form-group">
                <label class="form-label" for="usable">Operațional</label>
                <input type="number" required v-model="usable" @input="updateEquipment()" class="form-control" id="usable">
              </div>
              <div class="form-group">
                <label class="form-label" for="reserves">Rezervă</label>
                <input type="number" required v-model="reserves" @input="updateEquipment()" class="form-control" id="reserves">
              </div>
              <div class="form-group">
                <label class="form-label" for="unusable">Neoperațional</label>
                <input type="number" required v-model="unusable" @input="updateEquipment()" class="form-control"  id="unusable"/>
              </div>
              <div class="errors">
                <div v-for="error in errors" v-bind:key="error">
                  <p class="error">{{error}}</p>
                </div>
              </div>
            </div>

          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn custom-button"
              @click="saveAndClose()" :disabled="saveDisabled()"
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
  import EquipmentSummary from '../resource/EquipmentSummary.vue'

  export default {
    name: 'AddEquipmentForm',
    data: () => {
      return {
        errors: [],
        equipmentType: '',
        usable: 0,
        unusable: 0,
        reserves: 0,
        validationPerformedAtLeastOnce: false,
        unitModified: false
      }
    },
    components: {
      EquipmentSummary,
      Equipment,
    },
    computed: {

      resourceType() {
        return this.$store.state.principalStore.activeTab.resourceType;
      },
      filteredEquipment(){
        return this.$store.state.principalStore.activeUnit.equipment.filter(r => r.resourceType === this.resourceType);
      }
    },
    mounted(){
      this.validateFields();
    },
    methods: {
      saveDisabled() {
        return !this.unitModified;
      },
      addNewResourceDisabled() {
        return (this.errors.length !== 0 || !this.validationPerformedAtLeastOnce);
      },

      addNewEquipment() {
        this.unitModified = true;
        this.addEquipment();
        this.clearFormValues();
      },
      saveAndClose(){
        this.clearFormValues();
        this.updateUnit();
        this.closeAddResourceDialog();
      },
      cancel(){
        this.closeAddResourceDialog();
        // this.updateUnit();
      },
      addEquipment() {
        this.$store.dispatch(A.ADD_RESOURCE, this.constructEquipment());
      },
      constructEquipment() {
        return new Equipment(window.crypto.getRandomValues(new Uint32Array(4)).join('-'), this.equipmentType, this.usable, this.reserves, this.unusable, this.resourceType)
      },
      clearFormValues(){
        this.validationPerformedAtLeastOnce = false;
        this.equipmentType = '';
        this.usable = 0;
        this.unusable = 0;
        this.reserves = 0;
        this.errors = [];
        this.justMounted = true;
      },
      closeAddResourceDialog(){
        this.$store.dispatch(A.WEBSOCKET_SEND, new WebsocketSend('unlockSubUnit', new UnlockSubUnitRequest(this.$store.state.principalStore.activeUnit.name, this.equipmentType)));
        this.$store.dispatch(A.CLOSE_ADD_RESOURCE_DIALOG);
      },
      updateUnit(){
        this.$store.dispatch(A.WEBSOCKET_SEND, new WebsocketSend('updateSubUnit', new UpdateSubUnitRequest(this.$store.state.principalStore.activeUnit)));
      },

      onResourceClick(equipment) {
        this.selectedResourceId = equipment.equipmentId;
        this.setEditorFields(equipment);
      },
      validateFields () {
        this.validationPerformedAtLeastOnce = true;
        this.errors.splice(0, this.errors.length);
        if(this.equipmentType.length < 1){
          this.errors.push("Tipul echipamentului e obligatoriu");
        }

      },
      setEditorFields(equipment){
        this.errors = [];
        this.equipmentType = equipment.equipmentType;
        this.usable = equipment.usable;
        this.unusable = equipment.unusable;
        this.reserves = equipment.reserves;
        this.equipmentId = equipment.id;
        this.validationPerformedAtLeastOnce = false;
        this.selectedResourceId = equipment.id;

        this.validateFields();
      },
      rowColor(equipment) {
        if(equipment.equipmentId === this.selectedResourceId){
          return 1;
        }
        return 0;
      },

      deleteResource(resource) {
        this.selectedResourceId = null;
        this.unitModified = true;
        this.clearFormValues();
        this.$store.dispatch(A.DELETE_RESOURCE, resource);
      },

      updateEquipment() {
        this.validateFields();
        if(this.errors.length === 0){
          if (this.selectedResourceId) {
            let equipment = this.constructEquipment();
            equipment.id = this.selectedResourceId;
            this.unitModified = true;
            this.$store.dispatch(A.UPDATE_RESOURCE, equipment);
          }
        }
      },
    },
  }
</script>
<style src="./addResourceForm.css"></style>
