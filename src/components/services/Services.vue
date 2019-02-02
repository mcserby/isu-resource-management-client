<template>
  <div>
    <div class="services-header-menu">
      <div class="services-search-bar-wrapper">
        <form>
          <div class="row no-gutters align-items-center">
            <div class="col-auto">
              <i class="fas fa-search h4 text-body"></i>
            </div>
            <div class="col">
              <input
                class="form-control form-control-lg form-control-borderless"
                v-model="searchText"
                type="search"
                placeholder="Caută după nume, prenume sau funcție"
              >
            </div>
          </div>
        </form>
      </div>
      <div v-if="searchText !== ''" class="filter-activated">Filtru activ!</div>
      <div class="services-title">ISU TaskForce</div>
      <div class="services-other-modules-wrapper">
        <div>
          <router-link class="btn custom-button principal-button" role="button" to="/principal">Principal</router-link>
        </div>
        <div>
          <router-link class="btn custom-button uat-button" role="button" to="/uat">UAT</router-link>
        </div>
        <div class="report-button">
          <button class="btn custom-button" role="button" @click="generateReport()">Raport</button>
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
        <div class="service-header-rowNr">Nr.</div>
        <div class="service-header-name">Nume și Prenume</div>
        <div class="service-header-title">Grad</div>
        <div class="service-header-role">Funcție</div>
        <div class="service-header-contact">Contact</div>
        <div class="service-header-actions">Acțiuni</div>
      </div>
      <div v-for="(service,index) in filteredServices" v-bind:key="service.id">
        <Service :service="service" :rowNr="index"></Service>
      </div>
      <ConfirmationDialog
        v-if="isDeleteServiceDialogOpen"
        :title="deleteServiceConfirmationTitle"
        :text="deleteServiceConfirmationText"
        @confirm="onConfirmServiceDeletion"
        @cancel="onCancelServiceDeletion"
      ></ConfirmationDialog>
      <EditServiceForm
        v-if="isEditServiceDialogOpen"
        :service="this.$store.state.servicesStore.service"
        @confirm="onConfirmServiceEdit"
        @cancel="onCancelServiceEdit"
      ></EditServiceForm>
    </div>
    <ConfirmationDialog
      v-if="displayConfirmationDialog"
      :text="confirmationDialogText"
      :title="confirmationDialogTitle"
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
import A from "../../constants/actions";
import WSA from "../../constants/actions";
import WebsocketSubscribe from "../../contracts/websocketSubscribe";
import WebsocketSend from "../../contracts/websocketSend";
import ConfirmationDialog from "../common/ConfirmationDialog.vue";
import AddServiceForm from "./form/AddServiceForm.vue";
import AddServiceRequest from "../../contracts/services/addServiceRequest.js";
import ServicesUpdatedNotification from "../../contracts/services/servicesUpdatedNotification.js";
import EditServiceForm from "./form/EditServiceForm.vue";
import DeleteServiceRequest from "../../contracts/services/deleteServiceRequest.js";
import UpdateServiceRequest from "../../contracts/services/updateServiceRequest.js";

export default {
  name: "Services",
  components: {
    Service,
    ConfirmationDialog,
    AddServiceForm,
    EditServiceForm
  },
  data: () => {
    return {
      confirmationDialogTitle: "Schimb de tură",
      confirmationDialogText:
        "Sunteți sigur că doriți să ștergeți toate datele",
      deleteServiceConfirmationTitle: "Ștergere serviciu",
      deleteServiceConfirmationText:
        "Sunteți sigur că doriți să ștergeți serviciul",
      displayConfirmationDialog: false,
      displayAddServiceForm: false
    };
  },
  computed: {
    searchText: {
      get() {
        return this.$store.state.servicesStore.searchText;
      },
      set(value) {
        this.$store.dispatch(A.APPLY_SERVICE_FILTER, value);
      }
    },
    services() {
      return this.$store.state.servicesStore.services;
    },
    isEditServiceDialogOpen() {
      return this.$store.state.servicesStore.isEditServiceDialogOpen;
    },
    isDeleteServiceDialogOpen() {
      return this.$store.state.servicesStore.isDeleteServiceDialogOpen;
    },
    filteredServices() {
      const searchText = this.removeAccents(
        this.$store.state.servicesStore.searchText.toLowerCase()
      );
      if (searchText === "") {
        return this.services;
      }
      let words = searchText.split(" ").filter(w => w.length > 0);
      let filteredServicesByName = new Set(
        this.services.filter(s =>
          words.every(
            w =>
              s.name &&
              this.removeAccents(s.name.toLowerCase()).indexOf(w) !== -1
          )
        )
      );
      let filteredServicesByFunction = new Set(
        this.services.filter(s =>
          words.every(
            w =>
              s.role &&
              this.removeAccents(s.role.toLowerCase()).indexOf(w) !== -1
          )
        )
      );
      let allFilteredServices = new Set([
        ...filteredServicesByName,
        ...filteredServicesByFunction
      ]);
      return Array.from(allFilteredServices);
    },
    lastUpdate() {
      return this.$store.state.servicesStore.lastUpdate;
    },
    noServicesAvailable() {
      return this.$store.state.servicesStore.services.length === 0;
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
      A.WEBSOCKET_SUBSCRIBE,
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
        A.WEBSOCKET_SEND,
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
        A.WEBSOCKET_SEND,
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
    },
    removeAccents(text) {
      return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    },
    onCancelServiceEdit() {
      this.$store.dispatch(A.CLOSE_EDIT_SERVICE_DIALOG);
    },
    onCancelServiceDeletion() {
      this.$store.dispatch(A.CLOSE_DELETE_SERVICE_DIALOG);
    },
    onConfirmServiceDeletion() {
      this.$store.dispatch(
        WSA.WEBSOCKET_SEND,
        new WebsocketSend(
          "deleteService",
          new DeleteServiceRequest(this.$store.state.servicesStore.service.id)
        )
      );
      this.$store.dispatch(A.CLOSE_DELETE_SERVICE_DIALOG);
    },
    onConfirmServiceEdit(updatedService) {
      this.$store.dispatch(
        WSA.WEBSOCKET_SEND,
        new WebsocketSend(
          "updateService",
          new UpdateServiceRequest(updatedService)
        )
      );
      this.$store.dispatch(A.CLOSE_EDIT_SERVICE_DIALOG);
    }
  }
};
</script>

<style src="./services.css"></style>
