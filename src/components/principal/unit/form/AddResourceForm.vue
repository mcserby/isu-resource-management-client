<template>
    <div class="dialogContainer" style="display: block">
        <div class="dialog modal" role="dialog">
            <div class="modal-dialog modal-dialog-centered add-resource-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Adaugă resurse</h5>
                    </div>
                    <div class="modal-body">
                      <div class="form-group">
                        <label for="name">Numele resursei</label>
                        <input type="text" v-model="name" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Numele resursei">
                        <small id="nameHelp" class="form-text text-muted">Numele resursei</small>
                      </div>
                      <div class="form-group">
                        <label for="plateNumber">Număr de înmatriculare/label</label>
                        <input type="text" v-model="plateNumber" class="form-control" id="plateNumber" aria-describedby="plateNumberHelp" placeholder="Număr de înmatriculare">
                        <small id="plateNumberHelp" class="form-text text-muted">Număr de înmatriculare</small>
                      </div>
                      <div class="form-group">
                        <label for="identificationNumber">Număr de identificare</label>
                        <input type="text" v-model="identificationNumber" class="form-control" id="identificationNumber" aria-describedby="identificationNumberHelp" placeholder="Număr de identificare">
                        <small id="identificationNumberHelp" class="form-text text-muted">Număr de identificare</small>
                      </div>
                      <div class="form-group">
                        <label for="crew">Echipaj</label>
                        <textarea v-model="crew" class="form-control" id="crew" rows="3"></textarea>
                      </div>
                    </div>
                    <div class="modal-footer">
                            <button
                                    type="button"
                                    :class="['btn', 'btn-primary'].join(' ')"
                                    @click="saveAndAddAnother"
                            >
                                Salvează și adaugă o nouă resursă
                            </button>
                      <button
                        type="button"
                        :class="['btn', 'btn-primary'].join(' ')"
                        @click="saveAndClose"
                      >
                        Salvează și închide
                      </button>
                      <button
                        type="button"
                        :class="['btn', 'btn-primary'].join(' ')"
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
        name: '',
        plateNumber: '',
        identificationNumber: '',
        crew: '',
      }
    },
    computed: {
    },

    methods: {
      saveAndAddAnother(){
        this.addResouce();
        this.clearFormValues();
      },
      saveAndClose(){
        this.addResouce();
        this.clearFormValues();
        this.closeAddResourceDialog();
        this.updateUnit();
      },
      cancel(){
        this.updateUnit();
        this.closeAddResourceDialog();
      },
      addResouce(){
        this.$store.dispatch(A.ADD_RESOURCE, new Resource(this.name, this.plateNumber, this.identificationNumber, this.crew.split('\n')));
      },
      clearFormValues(){
        this.name = this.plateNumber = this.identificationNumber = this.crew = '';
      },
      closeAddResourceDialog(){
        this.$store.dispatch(A.WEBSOCKET_SEND, new WebsocketSend('unlockSubUnit', new UnlockSubUnitRequest(this.$store.state.principalStore.activeUnit.name)));
        this.$store.dispatch(A.CLOSE_ADD_RESOURCE_DIALOG);
      },
      updateUnit(){
        this.$store.dispatch(A.WEBSOCKET_SEND, new WebsocketSend('updatesubunit', new UpdateSubUnitRequest(this.$store.state.principalStore.activeUnit)));
      }

    },
  }
</script>
<style src="./addResourceForm.css"></style>
