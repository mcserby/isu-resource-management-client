<template>
  <div>
    <div class="services-header-menu">
      <div class="services-title">Modul Servicii</div>
      <div class="services-other-modules-wrapper">
        <div>
          <router-link class="btn menu-link-custom-properties menu-link" role="button" to="/principal">Modul Principal</router-link>
        </div>
        <div>
          <router-link class="btn menu-link-custom-properties menu-link" role="button" to="/uat">Modul UAT</router-link>
        </div>
      </div>
    </div>
    <div class="services-buttons">
      <button
        class="btn custom-service-button delete-button"
        @click="deleteServices()"
        :disabled="noServicesAvailable"
      >
        <span class="service-button-font-size">Șterge toate datele</span>
      </button>

      <button class="btn custom-service-button add-button" @click="addService()">
        <span class="service-button-font-size">Adaugă date</span>
      </button>
    </div>
    <div class="last-updated-services" v-if="noServicesAvailable">
      <span>
        <b>Nu exista date.</b>
      </span>
    </div>
    <div class="last-updated-services" v-if="servicesAvailable">
      <span>
        <b>Ultima actualizare: {{ lastUpdate | moment("DD.MM.YYYY, HH:mm:ss") }}.</b>
      </span>
    </div>
    <div class="services">
      <div class="services-header">
		<div class="service-header-rowNr">Nr</div>
        <div class="service-header-name">Nume și Prenume</div>
        <div class="service-header-title">Grad</div>
        <div class="service-header-role">Funcție</div>
        <div class="service-header-contact">Contact</div>
      </div>
      <div v-for="(service,index) in services" v-bind:key="service.id">
        <Service :service="service" :rowNr="index"></Service>
      </div>
    </div>
    <ConfirmationDialog
      v-if="displayConfirmationDialog"
      :text="confirmationDialogText"
      @confirm="onConfirm"
      @cancel="onCancelDeletion"
    ></ConfirmationDialog>
    <AddServiceForm
      v-if="displayAddServiceForm"
      @cancel="onCancelAdding"
      @saveAndClose="onSaveAndClose"
      @saveAndAddAnother="onSaveAndAddAnother"
    ></AddServiceForm>
  </div>
</template>

<script>
import Service from "./Service.vue";
import A from "../../constants/services/actions";
import WSA from "../../constants/actions";
import WebsocketSubscribe from "../../contracts/websocketSubscribe";
import WebsocketSend from "../../contracts/websocketSend";
import ConfirmationDialog from "../common/ConfirmationDialog.vue";
import AddServiceForm from "./form/AddServiceForm.vue";
import AddServiceRequest from "../../contracts/services/addServiceRequest.js";
import ServicesUpdatedNotification from "../../contracts/services/servicesUpdatedNotification.js";
import Vue from "vue";
Vue.use(require("vue-moment"));

export default {
  name: "Services",
  components: {
    Service,
    ConfirmationDialog,
    AddServiceForm
  },
  data: () => {
    return {
      confirmationDialogText:
        "Sunteți sigur că doriți să ștergeți toate datele ?",
      displayConfirmationDialog: false,
      displayAddServiceForm: false
    };
  },
  computed: {
    services() {
      return this.$store.state.servicesStore.services;
    },
    lastUpdate() {
      return this.$store.state.servicesStore.lastUpdate;
    },
    noServicesAvailable() {
      return this.$store.state.servicesStore.services.length == 0;
    },
    servicesAvailable() {
      return this.$store.state.servicesStore.services.length > 0;
    }
  },
  mounted: function() {
    console.log("Services.vue mounted");
    const self = this;
    let onServicesReceived = function(response) {
      let r = JSON.parse(response.body);
      self.$store.dispatch(
        A.INIT_SERVICES,
        new ServicesUpdatedNotification(r.services, r.lastUpdate)
      );
    };
    let onError = function(error) {
      console.err(error);
    };

    this.$store.dispatch(
      WSA.WEBSOCKET_SUBSCRIBE,
      new WebsocketSubscribe("services", onServicesReceived, onError)
    );
  },
  methods: {
    deleteServices() {
      this.displayConfirmationDialog = true;
    },
    addService() {
      this.displayAddServiceForm = true;
    },
    onConfirm() {
      this.$store.dispatch(A.CLEAR_ALL_SERVICES);
      this.$store.dispatch(
        WSA.WEBSOCKET_SEND,
        new WebsocketSend("deleteAllServices", "")
      );
      this.displayConfirmationDialog = false;
    },
    onCancelDeletion() {
      this.displayConfirmationDialog = false;
    },
    onCancelAdding() {
      this.displayAddServiceForm = false;
    },
    onSaveAndAddAnother(service) {
      this.displayAddServiceForm = false;
      this.$store.dispatch(
        WSA.WEBSOCKET_SEND,
        new WebsocketSend(
          "addService",
          new AddServiceRequest(
            service.name,
            service.title,
            service.role,
            service.contact
          )
        )
      );

      this.displayAddServiceForm = true;
    },
    onSaveAndClose(service) {
      this.$store.dispatch(
        WSA.WEBSOCKET_SEND,
        new WebsocketSend(
          "addService",
          new AddServiceRequest(
            service.name,
            service.title,
            service.role,
            service.contact
          )
        )
      );
      this.displayAddServiceForm = false;
    }
  }
};
</script>

<style src="./services.css"></style>
