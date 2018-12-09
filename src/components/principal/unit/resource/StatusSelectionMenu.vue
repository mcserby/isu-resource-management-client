<template>
  <div>
    <div
      v-bind:class="['mission-selection-dialog-container', statusMenuPosition == 'right' ? 'mission-selection-dialog-container-right' : 'mission-selection-dialog-container-left']"
      v-if="showMissionMenu"
      style="display: block"
    >
      <div class="dialog modal mission-status-dialog" role="dialog">
        <div class="modal-dialog mission-status-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Introduceți detalii despre misiune</h4>
            </div>
            <div class="modal-body status-dialog-content">
              <div class="form-group">
                <label class="form-label" for="key">Cheie:</label>
                <input type="text" required v-model="key" class="form-control" id="key">
              </div>
              <div class="form-group">
                <label class="form-label" for="description">Descriere:</label>
                <textarea
                  required
                  v-model="description"
                  class="form-control"
                  id="description"
                  rows="3"
                />
              </div>
              <div class="form-group">
                <label class="form-label" for="crew">Echipaj:</label>
                <textarea required v-model="crew" class="form-control" id="crew" rows="3"/>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn custom-button custom-status-selection-button"
                @click="confirmMission"
                :disabled="isSetStatusToMissionDisabled"
              >Confirmă misiunea</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-bind:class="['menu', statusMenuPosition == 'right' ? 'menu-right' : 'menu-left']"
      v-if="showMenu"
    >
      <menu class="menu-options">
        <menuitem
          class="menu-option menu-option-disponibil"
          @click="setStatusToDisponibil()"
        >Disponibil</menuitem>
        <menuitem class="menu-option menu-option-misiune" @click="toggleMissionMenu">Misiune</menuitem>
        <menuitem
          class="menu-option menu-option-indisponibil"
          @click="setStatusToIndisponibil()"
        >Indisponibil</menuitem>
      </menu>
    </div>
  </div>
</template>
<script>
import ClickOutside from "vue-click-outside";
import A from "../../../../constants/actions";
import Status from "../../../../contracts/status";
import UpdateResourceStatus from "../../../../contracts/edit/updateResourceStatus";
import WebsocketSend from "../../../../contracts/websocketSend";

export default {
  name: "StatusSelectionMenu",
  props: ["statusMenuPosition", "plateNumber"],
  data: () => {
    return {
      showMissionMenuPosition: "right",
      showMenu: true,
      showMissionMenu: false,
      key: "",
      description: "",
      crew: []
    };
  },
  computed: {
    isSetStatusToMissionDisabled() {
       return this.key === "" || this.description === "" || this.crew === "";
    }
  },
  methods: {
    openMissionMenu: function() {
      this.showMissionMenu = true;
    },
    toggleMissionMenu: function() {
      this.showMissionMenu = !this.showMissionMenu;
    },
    closeMissionMenu: function() {
      this.showMissionMenu = false;
    },
    closeMenu: function() {
      this.showMenu = false;
    },
    setStatusToDisponibil: function() {
      this.closeMissionMenu();
      this.closeMenu();
      this.$store.dispatch(
        A.WEBSOCKET_SEND,
        new WebsocketSend(
          "updateStatus",
          new UpdateResourceStatus(
            this.plateNumber,
            new Status("AVAILABLE", null, null, null)
          )
        )
      );
    },
    setStatusToIndisponibil: function() {
      this.closeMissionMenu();
      this.closeMenu();
      this.$store.dispatch(
        A.WEBSOCKET_SEND,
        new WebsocketSend(
          "updateStatus",
          new UpdateResourceStatus(
            this.plateNumber,
            new Status("UNAVAILABLE", null, null, null)
          )
        )
      );
    },
    confirmMission: function() {
      this.closeMissionMenu();
      this.closeMenu();
      let crewList = this.crew.split("\n");
      const captain = crewList[0];
      crewList = crewList.slice();
      crewList.shift();
      this.$store.dispatch(
        A.WEBSOCKET_SEND,
        new WebsocketSend(
          "updateStatus",
          new UpdateResourceStatus(
            this.plateNumber,
            new Status("IN_MISSION", this.key, this.description, crewList)
          )
        )
      );
    }
  },
  directives: {
    ClickOutside
  }
};
</script>
<style src="./statusSelectionMenu.css"></style>
