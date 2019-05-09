<template>
  <div class="resourceDialogContainer" style="display: block">
    <div class="dialog modal" role="dialog" style="display: block">
      <div class="modal-dialog modal-dialog-centered add-resource-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{activeTab.name}}</h5>
            <button type="button" class="btn close-button-custom" @click="cancel">X</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label" for="unit">Detașament</label>
              <input
                type="text"
                v-model="unit.name"
                class="form-control"
                id="unit"
                readonly="true"
              >
            </div>
            <div class="form-group">
              <label class="form-label" for="equipmentType">Tip echipament</label>
              <input
                type="text"
                v-model="equipment.equipmentType"
                class="form-control"
                id="equipmentType"
                readonly="true"
              >
            </div>
            <div class="form-group">
              <label class="form-label" for="usable">Operațional</label>
              <div class="equipment-number-container">
                <button class="btn plus-minus-button" @click="sub('usable')">-</button>
                <input type="number" min="0" class="form-control" @input="validateNotEmpty()" v-model="equipment.usable" id="usable" @keydown="monitorNumberKeyPressed">
                <button class="btn plus-minus-button" @click="add('usable')">+</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="reserves">Rezervă</label>
              <div class="equipment-number-container">
                <button class="btn plus-minus-button" @click="sub('reserves')">-</button>
                <input type="number" min="0" class="form-control" @input="validateNotEmpty()" v-model="equipment.reserves" id="reserves" @keydown="monitorNumberKeyPressed">
                <button class="btn plus-minus-button" @click="add('reserves')">+</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="unusable">Neoperațional</label>
              <div class="equipment-number-container">
                <button class="btn plus-minus-button" @click="sub('unusable')">-</button>
                <input type="number" min="0" class="form-control" @input="validateNotEmpty()" v-model="equipment.unusable" id="unusable" @keydown="monitorNumberKeyPressed">
                <button class="btn plus-minus-button" @click="add('unusable')">+</button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn custom-button" @click="saveAndClose">Salveaza si inchide</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import A from "../../../../constants/actions";
  import Equipment from '../../../../contracts/equipment';
  import WebsocketSend from '../../../../contracts/websocketSend';
  import UpdateSubUnitRequest from '../../../../contracts/edit/updateSubUnitRequest';

  export default {
    name: "EquipmentDialog",
    components: {
      Equipment
    },
    props: ["equipment", "unit"],
    data: () => {
      return {
        initialUsable : 0,
        initialReserves : 0,
        initialUnusable : 0
      }
    },
    computed: {
      activeTab () {
        return this.$store.state.principalStore.activeTab
      }
    },

    mounted: function() {
      this.initialUsable = this.equipment.usable;
      this.initialReserves = this.equipment.reserves;
      this.initialUnusable = this.equipment.unusable;

    },

    methods: {
      saveAndClose: function () {
        this.$store.dispatch(A.WEBSOCKET_SEND, new WebsocketSend('updateSubUnit', new UpdateSubUnitRequest(this.$store.state.principalStore.activeUnit)));
        this.$store.dispatch(A.CLOSE_VIEW_RESOURCE_DIALOG);
      },

      cancel: function () {
        this.$store.dispatch(A.CLOSE_VIEW_RESOURCE_DIALOG);
        this.equipment.usable = this.initialUsable;
        this.equipment.reserves = this.initialReserves;
        this.equipment.unusable = this.initialUnusable;
      },

      add: function (property) {
        this.equipment[property]++;
      },

      sub: function (property) {
        if(this.equipment[property] > 0) {
          this.equipment[property]--;
        }
      },
      validateNotEmpty(){
        if(!this.equipment.usable || isNaN(this.equipment.usable)){
          this.equipment.usable = 0;
        }
        if(!this.equipment.reserves || isNaN(this.equipment.reserves)){
          this.equipment.reserves = 0;
        }
        if(!this.equipment.unusable || isNaN(this.equipment.unusable)){
          this.equipment.unusable = 0;
        }
      },

      monitorNumberKeyPressed: function(evt) {
        // Do not allow the following chars in the number input: + - e E , .
        if ([69, 187, 188, 189, 190].includes(evt.keyCode)) {
          evt.preventDefault();
        }
      }
    },

  }

</script>

<style src="./addResourceForm.css"></style>
<style src="./equipmentDialog.css"></style>
