<template>
  <div class="dialogContainer" style="display: block">
    <div class="dialog modal" role="dialog">
      <div class="modal-dialog modal-dialog-centered add-resource-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Adaugă serviciu</h5>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label" for="name">Nume si Prenume</label>
              <input type="text" required v-model="name" class="form-control" id="name">
            </div>
            <div class="form-group">
              <label class="form-label" for="role">Grad</label>
              <input type="text" required v-model="role" class="form-control" id="role">
            </div>
            <div class="form-group">
              <label class="form-label" for="functionPlayed">Funcție</label>
              <input
                type="text"
                required
                v-model="functionPlayed"
                class="form-control"
                id="functionPlayed"
              >
            </div>
            <div class="form-group">
              <label class="form-label" for="contact">Contact</label>
              <textarea required v-model="contact" class="form-control" id="contact" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn custom-button"
              @click="saveAndAddAnother"
              :disabled="saveDisabled"
            >Salvează și adaugă un nou serviciu</button>
            <button
              type="button"
              class="btn custom-button"
              @click="saveAndClose"
              :disabled="saveDisabled"
            >Salvează și închide</button>
            <button type="button" class="btn custom-button" @click="cancel">Închide fără a salva</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "AddServiceForm",
  data: () => {
    return {
      name: "",
      role: "",
      functionPlayed: "",
      contact: ""
    };
  },
  computed: {},
  mounted() {},
  methods: {
    saveAndAddAnother() {},
    saveAndClose() {},
    cancel() {}
  }
};
</script>
<style src="./addServiceForm.css"></style>
