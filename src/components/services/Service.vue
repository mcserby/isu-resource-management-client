<template>
  <div v-bind:class="['services-wrapper', rowNr % 2 == 0 ? 'odd' : 'even']">
    <div v-bind:class="['services-wrapper', rowNr % 2 == 0 ? 'odd' : 'even']">
      <div class="service-rowNr">
        <div class="service-element-container">{{rowNr + 1}}</div>
      </div>
      <div class="service-name">
        <div class="service-element-container">{{service.name}}</div>
      </div>
      <div class="service-title">
        <div class="service-element-container">{{service.title}}</div>
      </div>
      <div class="service-role">
        <div class="service-element-container">{{service.role}}</div>
      </div>
      <div class="service-contact">
        <div class="service-element-container">{{service.contact}}</div>
      </div>
      <div class="service-actions">
        <button class="btn edit-delete-button" @click="triggerServiceDelete()">
          <span>Șterge</span>
        </button>
        <button class="btn edit-delete-button" @click="triggerServiceEdit()">
          <span>Editează</span>
        </button>
      </div>
    </div>
    <ConfirmationDialog
      v-if="displayServiceDeleteConfirmationDialog"
      :title="deleteServiceConfirmationTitle"
      :text="deleteServiceConfirmationText"
      @confirm="onConfirmServiceDeletion"
      @cancel="onCancelServiceDeletion"
    ></ConfirmationDialog>
    <EditServiceForm
      v-if="displayEditServiceForm"
      :service="service"
      @confirm="onConfirmServiceEdit"
      @cancel="onCancelServiceEdit"
    ></EditServiceForm>
  </div>
</template>

<script>
import WSA from "../../constants/actions";
import WebsocketSend from "../../contracts/websocketSend";
import DeleteServiceRequest from "../../contracts/services/deleteServiceRequest.js";
import UpdateServiceRequest from "../../contracts/services/updateServiceRequest.js";
import ConfirmationDialog from "../common/ConfirmationDialog.vue";
import EditServiceForm from "./form/EditServiceForm.vue";

export default {
  name: "Service",
  props: ["service", "rowNr"],
  components: {
    ConfirmationDialog,
    EditServiceForm
  },
  data: () => {
    return {
      deleteServiceConfirmationTitle: "Ștergere serviciu",
      deleteServiceConfirmationText:
        "Sunteți sigur că doriți să ștergeți serviciul",
      displayServiceDeleteConfirmationDialog: false,
      displayEditServiceForm: false
    };
  },
  methods: {
    onConfirmServiceDeletion() {
      this.$store.dispatch(
        WSA.WEBSOCKET_SEND,
        new WebsocketSend(
          "deleteService",
          new DeleteServiceRequest(this.service.id)
        )
      );
      this.displayServiceDeleteConfirmationDialog = false;
    },
    onCancelServiceDeletion() {
      this.displayServiceDeleteConfirmationDialog = false;
    },
    triggerServiceDelete() {
      this.displayServiceDeleteConfirmationDialog = true;
    },
    triggerServiceEdit() {
      this.displayEditServiceForm = true;
    },
    onConfirmServiceEdit(updatedService) {
      this.$store.dispatch(
        WSA.WEBSOCKET_SEND,
        new WebsocketSend(
          "updateService",
          new UpdateServiceRequest(updatedService)
        )
      );
      this.displayEditServiceForm = false;
    },
    onCancelServiceEdit() {
      this.displayEditServiceForm = false;
    }
  }
};
</script>

<style src="./service.css"></style>
