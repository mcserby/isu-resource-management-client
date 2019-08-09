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
              <label class="form-label" for="name">Nume și Prenume</label>
              <input type="text" required v-model="name" class="form-control" id="name">
            </div>
            <div class="form-group">
              <label class="form-label" for="title">Grad</label>
              <input type="text" required v-model="title" class="form-control" id="title">
            </div>
            <div class="form-group">
              <label class="form-label">Funcție</label>
              <select class="form-control" v-model="selectedFunction">
                <option v-for="f in functions" :value="f.name">{{f.name}}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Detașament</label>
              <select class="form-control" v-model="selectedSubUnit">
                <option v-for="su in subUnits" :value="su.name">{{su.name}}</option>
              </select>
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
      contact: "",
      functions: [],
      subUnits: [],
      selectedFunction: null,
      selectedSubUnit: null
    };
  },
  computed: {
    saveDisabled() {
      return this.name.trim() === "" ||
        this.title.trim() === "" ||
        this.selectedFunction === null ||
        this.selectedSubUnit === null ||
        this.contact.trim() === "";
    }
  },
  mounted() {
    this.functions = this.$store.state.managementStore.managedFunctions;
    this.selectedFunction = this.functions[0];
    this.subUnits = this.$store.state.managementStore.managedSubUnits;
    this.selectedSubUnit = this.subUnits[0];
  },
  methods: {
    saveAndAddAnother() {
      this.$emit(
        "saveAndAddAnother",
        new Service("", this.name, this.title, this.selectedFunction, this.selectedSubUnit, this.contact)
      );
      this.name = this.selectedFunction = this.selectedSubUnit = this.title = this.contact = "";
    },
    saveAndClose() {
      this.$emit(
        "saveAndClose",
        new Service("", this.name, this.title, this.selectedFunction, this.selectedSubUnit, this.contact)
      );
    },
    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>
<style src="./addServiceForm.css"></style>
