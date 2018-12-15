<template>
    <div class="dialogContainer" style="display: block">
        <div class="dialog modal" role="dialog">
            <div class="modal-dialog modal-dialog-centered add-resource-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{title}}</h5>
                    </div>
                    <div class="modal-body body-wrapper">
                      <div class="resource-browser-list">
                        <div class="resource-browser-resource-summary" v-for="(resource) in filteredResources" v-bind:key="resource.plateNumber">
                          <div class="resource-summary-card">
                            <ResourceSummary :resource="resource" :rowNr="rowColor(resource)" @mouseClick="onResourceClick($event)"></ResourceSummary>
                          </div>
                          <div class="delete-resource">
                            <button type="button" class="btn close-button" @click="deleteResource(resource)">X</button>
                          </div>
                        </div>
                        <div>
                          <button type="button" class="btn close-button" @click="addNewResource()">Add new resource</button>
                        </div>
                      </div>
                      <div class="resource-editor">
                        <div class="form-group">
                          <label class="form-label" for="vehicleType">Tip</label>
                          <input type="text" minlength="1" required v-model="vehicleType" @input="updateResource()" class="form-control" id="vehicleType" aria-describedby="nameHelp" placeholder="tip">
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
      }
    },
    computed: {
      saveDisabled() {
        return (this.selectedResourceId) && (this.errors.length !== 0 || !this.validationPerformedAtLeastOnce);
      },
      resourceType() {
        return this.$store.state.principalStore.activeTab.resourceType;
      },
      filteredResources(){
        return this.$store.state.principalStore.activeUnit.resources.filter(r => r.type === this.resourceType);
      },
      title() {
        return this.$store.state.principalStore.activeTab.name + ': ' + this.$store.state.principalStore.activeUnit.name;
      }

    },
    methods: {
      saveAndClose(){
        this.clearFormValues();
        this.closeAddResourceDialog();
        this.updateUnit();
      },
      cancel(){
        this.closeAddResourceDialog();
        this.updateUnit();
      },
      addNewResource() {
        this.clearFormValues();
        this.selectedResourceId = this.plateNumber;
        this.$store.dispatch(A.ADD_RESOURCE, this.constructResource());
      },
      constructResource(){
        let crewList = this.crew.split('\n');
        const captain = crewList[0];
        crewList = crewList.slice();
        crewList.shift();
        console.log(this.resourceType);
        this.selectedResourceId = this.plateNumber;
        return new Resource(this.vehicleType, this.plateNumber, this.identificationNumber, captain, crewList,
          new Status(ResourceStatus.AVAILABLE, null, null, null), this.resourceType);
      },
      clearFormValues(){
        this.validationPerformedAtLeastOnce = false;
        this.vehicleType = this.plateNumber = this.identificationNumber = this.crew = '';
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
      updateResource() {
        const resource = this.constructResource();
        this.validateFields();
        this.$store.dispatch(A.UPDATE_RESOURCE, resource);
      },
      validateFields() {
        this.validationPerformedAtLeastOnce = true;
        this.errors.splice(0, this.errors.length);
        if(this.vehicleType.length === 0){
          this.errors.push("Tipul trebuie sa contina cel putin un caracter.");
        }
        if(this.plateNumber.length < 5){
          this.errors.push("Numărul de înmatriculare trebuie să aibă cel puțin 5 caractere");
        }
        if(this.crew.length < 3){
          this.errors.push("Echipajul trebuie să conțină cel puțin un nume pe prima linie");
        }
      },
      onResourceClick(resource) {
        this.selectedResourceId = resource.plateNumber;
        this.setEditorFields(resource);
        console.log("clicked", resource);
      },
      setEditorFields(resource){
        this.errors = [];
        this.vehicleType = resource.vehicleType;
        this.plateNumber = resource.plateNumber;
        this.identificationNumber = resource.identificationNumber;
        this.crew = resource.captain + '\n' + resource.crew;
        this.validationPerformedAtLeastOnce = false;
        this.selectedResourceId = resource.plateNumber;
      },
      rowColor(resource) {
        if(resource.plateNumber === this.selectedResourceId){
          return 1;
        }
        return 0;
      },
      deleteResource(resource) {
        this.selectedResourceId = null;
        this.$store.dispatch(A.DELETE_RESOURCE, resource);
      }
    },
  }
</script>
<style src="./addResourceForm.css"></style>
