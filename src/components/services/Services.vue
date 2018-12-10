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

      <div class="last-updated">
        <span>
          <b>{{ services.lastUpdate | moment("DD.MM.YYYY, HH:mm:ss") }}</b>
        </span>
      </div>
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
    <ConfirmationDialogServices v-if="displayConfirmationDialog"></ConfirmationDialogServices>
  </div>
</template>

<script>
import Service from "./Service.vue";
import A from "../../constants/services/actions";
import WSA from "../../constants/actions";
import WebsocketSubscribe from "../../contracts/websocketSubscribe";
import WebsocketSend from "../../contracts/websocketSend";
import ConfirmationDialogServices from './form/ConfirmationDialogServices.vue';

export default {
  name: "Services",
  components: {
    Service,
    ConfirmationDialogServices
  },
  data: () => {
    return {
      displayConfirmationDialog: false
    }
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
     displayConfirmationDialog: true
    },
    deleteServices() {
      this.$store.dispatch(A.CLEAR_ALL_SERVICES);
      this.$store.dispatch(
        WSA.WEBSOCKET_SEND,
        new WebsocketSend("deleteAllServices", "")
      );
    },
    addService() {}
  }
};
</script>

<style src="./services.css"></style>
