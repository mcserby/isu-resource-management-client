<template>
  <div class="resourceDialogContainer" style="display: block">
    <div class="dialog modal" role="dialog">
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
              <div class="flex-container">
                <button class="btn increment-button" @click="sub('usable')">-</button>
                <input type="number" class="form-control" v-model="equipment.usable" id="usable">
                <button class="btn increment-button" @click="add('usable')">+</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="reserves">Rezervă</label>
              <div class="flex-container">
                <button class="btn increment-button" @click="sub('reserves')">-</button>
                <input type="number" class="form-control" v-model="equipment.reserves" id="reserves">
                <button class="btn increment-button" @click="add('reserves')">+</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="unusable">Neoperațional</label>
              <div class="flex-container">
                <button class="btn increment-button" @click="sub('unusable')">-</button>
                <input type="number" class="form-control" v-model="equipment.unusable" id="unusable">
                <button class="btn increment-button" @click="add('unusable')">+</button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn custom-button" @click="cancel">Salveaza si inchide</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import A from "../../../../constants/actions";
  import Equipment from '../../../../contracts/equipment';

  export default {
    name: "EquipmentDialog",
    props: ["equipment", "unit"],
    data: function () {
      return {
        equipment: this.equipment,
      }
    },
    methods: {
      cancel: function () {
        this.$store.dispatch(A.CLOSE_VIEW_RESOURCE_DIALOG);
        this.$store.dispatch(A.UPDATE_EQUIPMENT, this.equipment);
      },

      add: function (property) {
        this.equipment[property]++;
      },

      sub: function (property) {
        this.equipment[property]--;
      }
    },
      computed: {
        activeTab () {
          return this.$store.state.principalStore.activeTab
        }
      },

      components: {
        Equipment
      },
    }

</script>

<style src="./addResourceForm.css"></style>
<style src="./equipmentDialog.css"></style>
