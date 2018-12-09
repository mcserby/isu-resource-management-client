<template>
    <div class="dialogContainer" style="display: block">
        <div class="dialog modal" role="dialog">
            <div class="modal-dialog modal-dialog-centered add-resource-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Adaugă o resursă</h5>
                    </div>
                    <div class="modal-body">
                      <div class="form-group">
                        <label class="form-label" for="name">Tip</label>
                        <input type="text"  minlength="1" required v-model="name" @input="validateFields()" class="form-control" id="name" aria-describedby="nameHelp" placeholder="tip">
                      </div>
                      <div class="form-group">
                        <label class="form-label" for="plateNumber">Număr de înmatriculare</label>
                        <input type="text" minlength="5" required v-model="plateNumber" @input="validateFields()" class="form-control" id="plateNumber" aria-describedby="plateNumberHelp" placeholder="Număr de înmatriculare">
                      </div>
                      <div class="form-group">
                        <label class="form-label" for="identificationNumber">Număr de identificare</label>
                        <input minlength="2" type="text" required v-model="identificationNumber" @input="validateFields()" class="form-control" id="identificationNumber" aria-describedby="identificationNumberHelp" placeholder="Număr de identificare">
                      </div>
                      <div class="form-group">
                        <label class="form-label" for="crew">Echipaj</label>
                        <textarea minlength="5" required v-model="crew" class="form-control" @input="validateFields()" id="crew" rows="3"></textarea>
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
                                Salvează și adaugă o nouă resursă
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
  import Resource from '../../../../contracts/resource';
  import UnlockSubUnitRequest from '../../../../contracts/edit/unlockSubUnitRequest';
  import WebsocketSend from '../../../../contracts/websocketSend';
  import UpdateSubUnitRequest from "../../../../contracts/edit/updateSubUnitRequest";

  export default {
    name: 'AddResourceForm',
    data: () => {
      return {
        errors: [],
        name: '',
        plateNumber: '',
        identificationNumber: '',
        crew: '',
        validationPerformedAtLeastOnce: false,
      }
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
        this.addResource();
        this.clearFormValues();
      },
      saveAndClose(){
        this.addResource();
        this.clearFormValues();
        this.closeAddResourceDialog();
        this.updateUnit();
      },
      cancel(){
        this.closeAddResourceDialog();
        this.updateUnit();
      },
      addResource() {
        let crewList = this.crew.split('\n')
        const captain = crewList[0];
        crewList = crewList.slice();
        crewList.shift();
        console.log(this.resourceType);
        this.$store.dispatch(A.ADD_RESOURCE, new Resource(this.name, this.plateNumber, this.identificationNumber, captain, crewList, 'AVAILABLE_IN_GARAGE', this.resourceType));
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
        if(this.name.length < 3){
          this.errors.push("Numele trebuie să aibă cel puțin 3 caractere");
        }
        if(this.plateNumber.length < 5){
          this.errors.push("Numărul de înmatriculare trebuie să aibă cel puțin 5 caractere");
        }
        if(this.crew.length < 3){
          this.errors.push("Echipajul trebuie să conțină cel puțin un nume pe prima linie");
        }
      },
    },
  }
</script>
<style src="./addResourceForm.css"></style>
