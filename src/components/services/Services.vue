<template>
  <div>
    <div class="services-title">Modul Servicii</div>
    <div class="services-buttons">
      <button class="btn custom-service-button delete-button" @click="deleteServices()">
        <span class="service-button-font-size">Șterge toate datele</span>
      </button>
      
      <button class="btn custom-service-button add-button" @click="addService()">
        <span class="service-button-font-size">Adaugă date</span>
      </button>
    </div>
    <div class="services">
      <div class="services-header">
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
      @cancel="onCancel"
    ></ConfirmationDialog>
    <AddServiceForm v-if="displayAddServiceForm"></AddServiceForm>
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
    }
  },
  mounted: function() {
    console.log("Services.vue mounted");
    const self = this;
    let onServicesReceived = function(response) {
      let r = JSON.parse(response.body);
      self.$store.dispatch(A.INIT_SERVICES, r.services);
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
    onCancel() {
      this.displayConfirmationDialog = false;
    }
  }
};
</script>

<style src="./services.css"></style>
