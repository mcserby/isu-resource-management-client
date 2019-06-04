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
      <div class="services-title">ISU EasyManage - Servicii</div>
      <div class="services-other-modules-wrapper">
        <div class="principal-button">
          <router-link class="custom-button btn" role="button" to="/principal">Principal</router-link>
        </div>
        <div class="uat-button">
          <router-link class="custom-button btn" role="button" to="/uat">UAT</router-link>
        </div>
        <div class="management-button">
          <router-link class="custom-button btn" role="button" to="/management">Management</router-link>
        </div>
        <div class="report-button">
          <router-link class="custom-button btn" role="button" to="/report">Raport</router-link>
        </div>
      </div>
    </div>
    <div class="services-buttons">
      <button
        class="custom-service-button delete-button btn"
        @click="deleteServices()"
        :disabled="noServicesAvailable"
      >
        <span class="service-button-font-size">Șterge toate datele</span>
      </button>

      <button class="custom-service-button add-button btn" @click="addService()">
        <span class="service-button-font-size">Adaugă date</span>
      </button>

      <button class="custom-service-button transfer-button btn" @click="transferServices()" :hidden="isTodayActive" :disabled="isFilterActive">
        <span class="service-button-font-size">Transferă</span>
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
    <ul class="nav nav-tabs">
      <li class="nav-item" v-for="tab in tabs">
        <template class="nav-item">
          <a :class="tabClass(tab.name)" class="tab-text" @click="changeTab(tab)">{{tab.name}}</a>
        </template>
      </li>
    </ul>
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
    <TransferDialog
      v-if="displayTransferDialog"
      :text="transferDialogText"
      :title="transferDialogTitle"
      @confirm="onTransfer"
      @cancel="onCancelTransfer"
    ></TransferDialog>
    <NotificationDialog
      v-if="displayTransferFinishedDialog"
      :text="transferFinishedDialogText"
      :title="transferFinishedDialogTitle"
      @ok="onTransferFinished"
      @cancel="onTransferFinished"
    ></NotificationDialog>
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
  import NotificationDialog from "../common/NotificationDialog.vue";
  import TransferDialog from "../common/TransferDialog.vue";
  import AddServiceForm from "./form/AddServiceForm.vue";
  import AddServiceRequest from "../../contracts/services/addServiceRequest.js";
  import ServicesUpdatedNotification from "../../contracts/services/servicesUpdatedNotification.js";
  import EditServiceForm from "./form/EditServiceForm.vue";
  import DeleteServiceRequest from "../../contracts/services/deleteServiceRequest.js";
  import DeleteServicesRequest from "../../contracts/services/deleteServicesRequest.js";
  import TransferServicesRequest from "../../contracts/services/transferServicesRequest.js";
  import UpdateServiceRequest from "../../contracts/services/updateServiceRequest.js";
  import FunctionsUpdatedNotification from "../../contracts/management/functions/functionsUpdatedNotification";

  export default {
    name: "Services",
    components: {
      Service,
      ConfirmationDialog,
      NotificationDialog,
      TransferDialog,
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
        displayTransferDialog: false,
        displayTransferFinishedDialog: false,
        displayAddServiceForm: false,
        transferDialogText: 
          "Sunteți sigur ca doriți sa transferați datele in tab-ul \"Azi\"? Datele curente din tab-ul \"Azi\" vor fi suprascrise",
        transferDialogTitle:
          "Transfer servicii",
        transferFinishedDialogText: 
          "Datele din tab-ul \"Azi\" au fost copiate din tab-ul \"Maine\"",
        transferFinishedDialogTitle:
          "Transfer servicii incheiat"
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
      tabs() {
        return this.$store.state.servicesStore.tabs;
      },
      activeTab() {
        return this.$store.state.servicesStore.activeTab;
      },
      isEditServiceDialogOpen() {
        return this.$store.state.servicesStore.isEditServiceDialogOpen;
      },
      isDeleteServiceDialogOpen() {
        return this.$store.state.servicesStore.isDeleteServiceDialogOpen;
      },

      filteredServices() {
        //Sort services by role
        let sortedServices = this.sortByRole(this.services);

        let filteredServicesByDay = sortedServices.filter(s => s.day === this.activeTab.servicesDay);
        const searchText = this.removeAccents(
          this.$store.state.servicesStore.searchText.toLowerCase()
        );
        if (searchText === "") {
          return filteredServicesByDay;
        }
        let words = searchText.split(" ").filter(w => w.length > 0);
        let filteredServicesByName = new Set(
          filteredServicesByDay.filter(s =>
            words.every(
              w =>
                s.name &&
                this.removeAccents(s.name.toLowerCase()).indexOf(w) !== -1
            )
          )
        );
        let filteredServicesByFunction = new Set(
          filteredServicesByDay.filter(s =>
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

        return allFilteredServices;
      },
      lastUpdate() {
        return this.$store.state.servicesStore.lastUpdate;
      },
      noServicesAvailable() {
        let filteredServicesByDay = this.services.filter(s => s.day === this.activeTab.servicesDay);
        return filteredServicesByDay.length === 0;
      },
      servicesAvailable() {
        let filteredServicesByDay = this.services.filter(s => s.day === this.activeTab.servicesDay);
        return filteredServicesByDay.length > 0;
      },
      isTodayActive() {
        return this.activeTab.servicesDay === "TODAY";
      },
      isFilterActive() {
        return this.$store.state.servicesStore.searchText !== '';
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

      let onFunctionsReceived = function(response) {
        let r = JSON.parse(response.body);
        self.$store.dispatch(
          A.MANAGED_FUNCTIONS_RECEIVED,
          new FunctionsUpdatedNotification(r.functions)
        );
      };

      this.$store.dispatch(
        A.WEBSOCKET_SUBSCRIBE,
        new WebsocketSubscribe("functions", onFunctionsReceived, onError)
      );
    },
    methods: {
      changeTab(tab) {
        this.$store.dispatch(A.CHANGE_ACTIVE_TAB_SERVICES, tab);
      },
      tabClass: function(tabName) {
        return [
          "nav-link",
          "btn",
          tabName === this.activeTab.name ? "active" : ""
        ].join(" ");
      },
      deleteServices() {
        this.displayConfirmationDialog = true;
      },
      addService() {
        this.displayAddServiceForm = true;
      },
      transferServices() {
        this.displayTransferDialog = true;
      },
      onConfirm() {
        this.$store.dispatch(A.CLEAR_ALL_SERVICES);
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "deleteAllServices",
            new DeleteServicesRequest(this.activeTab.servicesDay)
          )
        );
        this.displayConfirmationDialog = false;
      },
      onTransfer() {
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "transferServices",
            new TransferServicesRequest()
          )
        );
        this.displayTransferDialog = false;
        this.$store.dispatch(A.CHANGE_ACTIVE_TAB_SERVICES, this.$store.state.servicesStore.tabs[0]);
        this.displayTransferFinishedDialog = true;
      },
      onTransferFinished() {
        this.displayTransferFinishedDialog = false;
      },
      onCancelDeletion() {
        this.displayConfirmationDialog = false;
      },
      onCancelTransfer() {
        this.displayTransferDialog = false;
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
              service.contact,
              this.activeTab.servicesDay
            )
          )
        );
        this.displayAddServiceForm = true;
      },
      sortByRole(services){
        let managedFunctions = this.$store.state.managementStore.managedFunctions.map(f => f.name);

        return services.slice().sort(function(a, b){
          if(managedFunctions.indexOf(a.role) != -1 && managedFunctions.indexOf(b.role) != -1){
            return managedFunctions.indexOf(a.role) - managedFunctions.indexOf(b.role);
          } else if (managedFunctions.indexOf(a.role) === -1 && managedFunctions.indexOf(b.role) != -1){
            return 1;
          } else if (managedFunctions.indexOf(a.role) != -1 && managedFunctions.indexOf(b.role) === -1){
            return -1;
          }
        });
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
              service.contact,
              this.activeTab.servicesDay
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
<style src="../main.css"></style>
