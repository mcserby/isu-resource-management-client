<template>
  <div class="dialogContainer" style="display: block">
    <div class="dialog modal" role="dialog">
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
              <label class="form-label" for="serviceRole">Funcție</label>
              <input type="text" required v-model="serviceRole" class="form-control" id="role">
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
              class="btn custom-button"
              @click="saveAndClose"
            >Salvează și închide</button>
            <button
              type="button"
              class="btn custom-button"
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
      serviceRole: "",
      serviceContact: ""
    };
  },
  computed: {},
  mounted() {
    this.serviceName = this.service.name;
    this.serviceTitle = this.service.title;
    this.serviceRole = this.service.role;
    this.serviceContact = this.service.contact;
  },
  methods: {
    saveAndClose() {
      this.$emit(
        "confirm",
        new Service(
          this.service.id,
          this.serviceName,
          this.serviceTitle,
          this.serviceRole,
          this.serviceContact
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
