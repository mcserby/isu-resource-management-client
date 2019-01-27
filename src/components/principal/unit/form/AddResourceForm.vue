<template>
    <div class="dialogContainer" style="display: block">
        <div class="dialog modal" role="dialog">
            <div class="modal-dialog modal-dialog-centered add-resource-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{title}}</h5>
                        <button type="button" class="btn custom-close-button" @click="cancel()">X</button>
                    </div>
                    <div class="modal-body body-wrapper">
                      <div class="resource-browser-list">
                        <div class="resource-browser-resource-summary" v-for="(resource) in filteredResources" v-bind:key="resource.id">
                          <div class="resource-summary-card">
                            <ResourceSummary :resource="resource" :rowNr="rowColor(resource)" @mouseClick="onResourceClick(resource)"></ResourceSummary>
                          </div>
                          <div class="delete-resource">
                            <button type="button" class="btn custom-close-button" @click="deleteResource(resource)">X</button>
                          </div>
                        </div>
                        <div class="resource-browser-resource-summary">
                          <div class="add-resource-button-wrapper">
                            <button type="button" class="btn custom-button" @click="addNewResource()" :disabled="addNewResourceDisabled()">Adaugă o resursă</button>
                          </div>
                        </div>
                      </div>
                      <div class="resource-editor">
                        <div class="form-group">
                          <label class="form-label" for="vehicleType">Tip</label>
                          <input type="text" minlength="1" required v-model="vehicleType" @input="updateResource()" class="form-control" id="vehicleType" aria-describedby="nameHelp" placeholder="Tip">
                        </div>
                        <div class="form-group">
                          <label class="form-label" for="plateNumber">Număr de înmatriculare</label>
                          <input type="text" minlength="5" required v-model="plateNumber" @input="updateResource()" class="form-control" id="plateNumber" aria-describedby="plateNumberHelp" placeholder="Număr de înmatriculare">
                        </div>
                        <div class="form-group">
                          <label class="form-label" for="identificationNumber">Număr de identificare</label>
                          <input minlength="2" type="text" required v-model="identificationNumber" @input="updateResource()" class="form-control" id="identificationNumber" aria-describedby="identificationNumberHelp" placeholder="Număr de identificare">
                        </div>
                        <div class="form-group">
                          <label class="form-label" for="crew">Echipaj</label>
                          <textarea minlength="5" required v-model="crew" class="form-control" @input="updateResource()" id="crew" rows="3"></textarea>
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
                        Anulează și închide
                      </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

  import A from '../../../../constants/actions';
  import Resource from '../../../../contracts/resource';
  import Status from '../../../../contracts/status';
  import ResourceStatus from '../../../../constants/resourceStatus';
  import UnlockSubUnitRequest from '../../../../contracts/edit/unlockSubUnitRequest';
  import WebsocketSend from '../../../../contracts/websocketSend';
  import UpdateSubUnitRequest from "../../../../contracts/edit/updateSubUnitRequest";
  import ResourceSummary from '../resource/ResourceSummary.vue';
  import Utils from '../../../../services/utils';

  export default {
    name: 'AddResourceForm',
    components: {
      ResourceSummary
    },
    data: () => {
      return {
        errors: [],
        vehicleType: '',
        plateNumber: '',
        identificationNumber: '',
        crew: '',
        validationPerformedAtLeastOnce: false,
        selectedResourceId: null,
        justMounted: true,
        changesPerformed: false,
      }
    },
    computed: {
      saveDisabled() {
        return !this.changesPerformed;
      },
      resourceType() {
        return this.$store.state.principalStore.activeTab.resourceType;
      },
      filteredResources(){
        return this.$store.state.principalStore.activeUnit.resources.filter(r => r.type === this.resourceType);
      },
      existingLicencePlatesInOtherUnits() {
        return [].concat.apply([], this.$store.state.principalStore.units.filter(u => u.name !== this.$store.state.principalStore.activeUnit.name).map(u => u.resources.map(r => r.plateNumber)));
      },
      title() {
        return this.$store.state.principalStore.activeTab.name + ': ' + this.$store.state.principalStore.activeUnit.name;
      }
    },
    methods: {
      addNewResourceDisabled() {
        return this.currentEditingResourceIsInvalid();
      },
      currentEditingResourceIsInvalid(){
        return (this.selectedResourceId) && (this.errors.length !== 0 && this.validationPerformedAtLeastOnce);
      },
      saveAndClose(){
        this.clearFormValues();
        this.closeAddResourceDialog();
        this.updateUnit();
      },
      cancel(){
        this.closeAddResourceDialog();
      },
      addNewResource() {
        this.justMounted = false;
        this.clearFormValues();
        const resource = this.constructResource(Utils.createUUID());
        this.selectedResourceId = resource.id;
        this.setEditorFields(resource);
        this.validateFields();
        this.$store.dispatch(A.ADD_RESOURCE, resource);
        this.changesPerformed = true;
      },
      constructResource(id){
        let crewList = this.crew.split(/[\n,]/).filter(c => c.length !== 0);
        const captain = crewList[0];
        crewList = crewList.slice();
        crewList.shift();
        return new Resource(id, this.vehicleType, this.plateNumber, this.identificationNumber, captain, crewList,
          new Status(ResourceStatus.AVAILABLE, null, null, null), this.resourceType);
      },
      clearFormValues(){
        this.validationPerformedAtLeastOnce = false;
        this.vehicleType = this.plateNumber = this.identificationNumber = this.crew = '';
        this.errors = [];
      },
      closeAddResourceDialog(){
        this.$store.dispatch(A.WEBSOCKET_SEND, new WebsocketSend('unlockSubUnit', new UnlockSubUnitRequest(this.$store.state.principalStore.activeUnit.name, this.resourceType)));
        this.$store.dispatch(A.CLOSE_ADD_RESOURCE_DIALOG);
      },
      updateUnit(){
        console.log('updateUnit', JSON.stringify(this.$store.state.principalStore.activeUnit));
        this.$store.dispatch(A.WEBSOCKET_SEND, new WebsocketSend('updateSubUnit', new UpdateSubUnitRequest(this.$store.state.principalStore.activeUnit)));
      },
      updateResource() {
        this.justMounted = false;
        this.validateFields();
        if(this.errors.length === 0){
          let resource = this.constructResource(this.selectedResourceId);
          this.$store.dispatch(A.UPDATE_RESOURCE, resource);
          this.changesPerformed = true;
        }
      },
      validateFields() {
        this.validationPerformedAtLeastOnce = true;
        this.errors.splice(0, this.errors.length);
        if(this.vehicleType.length === 0){
          this.errors.push("Tipul trebuie sa contina cel putin un caracter.");
        }
        const currentPlateNumbers = this.$store.state.principalStore.activeUnit.resources.filter(r => r.id !== this.selectedResourceId).map(r => r.plateNumber);
        const licencePlates = this.existingLicencePlatesInOtherUnits.concat(currentPlateNumbers);
        if(this.plateNumber.length < 5){
          this.errors.push("Numărul de înmatriculare trebuie să aibă cel puțin 5 caractere");
        } else if(licencePlates.find(pn => pn === this.plateNumber)){
          this.errors.push("Numărul de înmatriculare trebuie să fie unic");
        }
        if(this.identificationNumber.length < 1){
          this.errors.push("Numarul de identificare trebuie să aibă cel puțin 1 caracter");
        }
        if(this.crew.length < 3){
          this.errors.push("Echipajul trebuie să conțină cel puțin un nume pe prima linie");
        }
      },
      onResourceClick(resource) {
        this.setEditorFields(resource);
      },
      setEditorFields(resource){
        this.errors = [];
        this.vehicleType = resource.vehicleType;
        this.plateNumber = resource.plateNumber;
        this.identificationNumber = resource.identificationNumber;
        this.crew = resource.captain + '\n' + resource.crew;
        this.validationPerformedAtLeastOnce = false;
        this.selectedResourceId = resource.id;
      },
      rowColor(resource) {
        if(resource.id === this.selectedResourceId){
          return 1;
        }
        return 0;
      },
      deleteResource(resource) {
        this.errors = [];
        this.justMounted = false;
        this.selectedResourceId = this.filteredResources.length === 0? null : this.filteredResources[0].id;
        this.clearFormValues();
        this.$store.dispatch(A.DELETE_RESOURCE, resource);
        this.changesPerformed = true;
      }
    },
  }
</script>
<style src="./addResourceForm.css"></style>
