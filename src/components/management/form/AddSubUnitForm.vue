<template>
  <div class="dialogContainer" style="display: block">
    <div class="dialog modal" role="dialog" style="display: block">
      <div class="modal-dialog modal-dialog-centered add-service-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Adaugă subunitate</h5>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label" for="name">Nume subunitate</label>
              <input type="text" required v-model="name" class="form-control" id="name">
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn custom-button"
              @click="saveAndAddAnother"
            >Salvează și adaugă o nouă subunitate</button>
            <button
              type="button"
              class="btn custom-button"
              @click="saveAndClose"
            >Salvează și închide</button>
            <button type="button" class="btn custom-button" @click="cancel">Închide fără a salva</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import Unit from '../../../contracts/unit';

  export default {
    name: "AddSubUnitForm",
    data: () => {
      return {
        name: "",
      };
    },
    methods: {
      saveAndAddAnother() {
        this.$emit(
          "saveAndAddAnother",
          new Unit(this.name, [], [], null, null, null)
        );
      },
      saveAndClose() {
        this.$emit(
          "saveAndClose",
          new Unit(this.name, [], [], null, null, null)
        );
      },
      cancel() {
        this.$emit("cancel");
      }
    }
  };
</script>
<style src="../../services/form/addServiceForm.css"></style>
