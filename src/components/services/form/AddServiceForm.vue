<template>
  <div class="dialogContainer" style="display: block">
    <div class="dialog modal" role="dialog" style="display: block">
      <div class="modal-dialog modal-dialog-centered add-service-dialog" role="document">
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
              <label class="form-label" for="title">Grad</label>
              <input type="text" required v-model="title" class="form-control" id="title">
            </div>
            <div class="form-group">
              <label class="form-label" for="role">Funcție</label>
              <input type="text" required v-model="role" class="form-control" id="role">
            </div>
            <div class="form-group">
              <label class="form-label" for="contact">Contact</label>
              <textarea required v-model="contact" class="form-control" id="contact" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="custom-button btn"
              @click="saveAndAddAnother"
              :disabled="saveDisabled"
            >Salvează și adaugă un nou serviciu</button>
            <button
              type="button"
              class="custom-button btn"
              @click="saveAndClose"
              :disabled="saveDisabled"
            >Salvează și închide</button>
            <button type="button" class="custom-button btn" @click="cancel">Închide fără a salva</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Service from "../../../contracts/services/service.js";

export default {
  name: "AddServiceForm",
  data: () => {
    return {
      name: "",
      title: "",
      role: "",
      contact: ""
    };
  },
  computed: {
    saveDisabled() {
      return this.name.trim() == "" ||
        this.title.trim() == "" ||
        this.role.trim() == "" ||
        this.contact.trim() == "";
    }
  },
  mounted() {},
  methods: {
    saveAndAddAnother() {
      this.$emit(
        "saveAndAddAnother",
        new Service("", this.name, this.title, this.role, this.contact)
      );
      this.name = this.role = this.title = this.contact = "";
    },
    saveAndClose() {
      this.$emit(
        "saveAndClose",
        new Service("", this.name, this.title, this.role, this.contact)
      );
    },
    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>
<style src="./addServiceForm.css"></style>
