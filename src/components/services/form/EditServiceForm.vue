<template>
  <div class="dialogContainer" style="display: block">
    <div class="dialog modal" role="dialog" style="display: block">
      <div class="modal-dialog modal-dialog-centered add-service-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editează serviciu</h5>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label" for="serviceName">Nume și Prenume</label>
              <input type="text" required v-model="serviceName" class="form-control" id="name">
            </div>
            <div class="form-group">
              <label class="form-label" for="serviceTitle">Grad</label>
              <input type="text" required v-model="serviceTitle" class="form-control" id="title">
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
              <label class="form-label" for="serviceContact">Contact</label>
              <textarea
                required
                v-model="serviceContact"
                class="form-control"
                id="contact"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="custom-button btn"
              @click="saveAndClose"
            >Salvează și închide</button>
            <button
              type="button"
              class="custom-button btn"
              @click="closeWithoutSaving"
            >Închide fără a salva</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Service from "../../../contracts/services/service.js";

export default {
  name: "EditServiceForm",
  props: ["service"],
  data: () => {
    return {
      serviceName: "",
      serviceTitle: "",
      serviceContact: "",
      functions: [],
      subUnits: [],
      selectedFunction: null,
      selectedSubUnit: null
    };
  },
  computed: {},
  mounted() {
    this.serviceName = this.service.name;
    this.serviceTitle = this.service.title;
    this.serviceContact = this.service.contact;
    this.functions = this.$store.state.managementStore.managedFunctions;
    this.subUnits = this.$store.state.managementStore.managedSubUnits;
    this.selectedFunction = this.service.role;
    this.selectedSubUnit = this.service.subUnit;
    this.day = this.service.day;
  },
  methods: {
    saveAndClose() {
      this.$emit(
        "confirm",
        new Service(
          this.service.id,
          this.serviceName,
          this.serviceTitle,
          this.selectedFunction,
          this.selectedSubUnit,
          this.serviceContact,
          this.day
        )
      );
    },
    closeWithoutSaving() {
      this.$emit("cancel");
    }
  }
};
</script>
<style src="./editServiceForm.css"></style>
