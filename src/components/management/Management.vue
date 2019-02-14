<template>
  <div>
    <ManagementHeader></ManagementHeader>
    <div class="unit-name-list-section">
      <div class="unit-name-list-container" v-for="(name) in unitNames" v-bind:key="name">
        <div class="unit-name-element">
          <span>{{name}}</span>
        </div>
        <div class="delete-sub-unit">
          <button
            type="button"
            class="btn custom-close-button"
            @click="triggerSubUnitDeletion(name)"
          >X</button>
        </div>
      </div>
    </div>
    <div>
      <button
        type="button"
        class="custom-button btn"
        @click="openAddNewSubUnitForm()"
      >Adaugă o subunitate</button>
    </div>
    <ConfirmationDialog
      v-if="displayConfirmationDialog"
      :title="confirmationDialogTitle"
      :text="confirmationDialogText"
      @confirm="confirmDeletionOfSubUnit"
      @cancel="onCancelDeletion"
    ></ConfirmationDialog>
    <AddSubUnitForm
      v-if="displayAddSubUnitForm"
      @cancel="onCancelAdding"
      @saveAndClose="onSaveAndClose"
      @saveAndAddAnother="onSaveAndAddAnother"
    ></AddSubUnitForm>
  </div>
</template>

<script>
import Unit from "../principal/unit/Unit.vue";
import AddSubUnitForm from "./form/AddSubUnitForm.vue";
import ConfirmationDialog from "../common/ConfirmationDialog.vue";
import A from "../../constants/actions";
import WebsocketSubscribe from "../../contracts/websocketSubscribe";
import WebsocketSend from "../../contracts/websocketSend";
import ManagementHeader from "./header/ManagementHeader.vue";
import AddSubUnitRequest from "../../contracts/subunits/addSubUnitRequest";
import DeleteSubUnitRequest from "../../contracts/subunits/deleteSubUnitRequest";

export default {
  name: "Management",
  components: {
    Unit,
    AddSubUnitForm,
    ConfirmationDialog,
    ManagementHeader
  },
  data: () => {
    return {
      title: "Managementul sub-unităților",
      displayAddSubUnitForm: false,
      displayConfirmationDialog: false,
      confirmationDialogTitle: "Ștergere subunitate",
      currentUnitName: null
    };
  },
  computed: {
    unitNames() {
      return this.$store.state.principalStore.units.map(u => u.name);
    },
    confirmationDialogText() {
      return (
        "Sunteți sigur că doriți să ștergeți detașamentul " +
        this.currentUnitName
      );
    }
  },
  methods: {
    openAddNewSubUnitForm() {
      this.displayAddSubUnitForm = true;
    },
    onCancelAdding() {
      this.closeAddNewSubUnitForm();
    },
    onSaveAndClose(subunit) {
      this.addSubUnit(subunit);
      this.closeAddNewSubUnitForm();
    },
    onSaveAndAddAnother(subunit) {
      this.addSubUnit(subunit);
    },
    closeAddNewSubUnitForm() {
      this.displayAddSubUnitForm = false;
    },
    triggerSubUnitDeletion(subUnitName) {
      this.currentUnitName = subUnitName;
      this.openConfirmationDialog();
    },
    confirmDeletionOfSubUnit() {
      this.closeConfirmationDialog();
      this.deleteSubUnit(this.currentUnitName);
    },
    onCancelDeletion() {
      this.closeConfirmationDialog();
    },
    openConfirmationDialog() {
      this.displayConfirmationDialog = true;
    },
    closeConfirmationDialog() {
      this.displayConfirmationDialog = false;
    },
    deleteSubUnit(unitName) {
      this.$store.dispatch(
        A.WEBSOCKET_SEND,
        new WebsocketSend("deleteSubUnit", new DeleteSubUnitRequest(unitName))
      );
    },
    addSubUnit(subunit) {
      this.$store.dispatch(
        A.WEBSOCKET_SEND,
        new WebsocketSend("addSubUnit", new AddSubUnitRequest(subunit))
      );
    }
  },
  mounted: function() {
    console.log("Management module mounted");
    const self = this;

    let onAddSubUnitResponse = function(response) {
      let r = JSON.parse(response.body);
      console.log(r);
    };

    let onDeleteSubUnitResponse = function(response) {
      let r = JSON.parse(response.body);
      console.log(r);
    };

    let onError = function(error) {
      console.err(error);
    };

    this.$store.dispatch(
      A.WEBSOCKET_SUBSCRIBE,
      new WebsocketSubscribe(
        "unitAddedNotification",
        onAddSubUnitResponse,
        onError
      )
    );
    this.$store.dispatch(
      A.WEBSOCKET_SUBSCRIBE,
      new WebsocketSubscribe(
        "unitDeletedNotification",
        onDeleteSubUnitResponse,
        onError
      )
    );
  }
};
</script>

<style src="./management.css"></style>
