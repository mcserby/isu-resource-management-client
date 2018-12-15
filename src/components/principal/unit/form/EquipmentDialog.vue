<template>
  <div class="resourceDialogContainer" style="display: block">
    <div class="dialog modal" role="dialog">
      <div class="modal-dialog modal-dialog-centered add-resource-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{activeTab.name}}</h5>
            <button type="button" class="btn close-button" @click="cancel">X</button>
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
              <input
                type="text"
                minlength="5"
                class="form-control"
                id="usable"
                v-model="equipment.usable"
                readonly="true"
              >
            </div>
            <div class="form-group">
              <label class="form-label" for="reserves">Rezervă</label>
              <input
                minlength="2"
                type="text"
                class="form-control"
                id="reserves"
                placeholder="Număr de identificare"
                v-model="equipment.reserves"
                readonly="true"
              >
            </div>
            <div class="form-group">
              <label class="form-label" for="unusable">Neoperațional</label>
              <input
                minlength="2"
                type="text"
                class="form-control"
                id="unusable"
                rows="3"
                readonly="true"
                v-model="equipment.unusable"
              >
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn custom-button" @click="cancel">Închide</button>
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
    methods: {
      cancel: function () {
        this.$store.dispatch(A.CLOSE_VIEW_RESOURCE_DIALOG);
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
