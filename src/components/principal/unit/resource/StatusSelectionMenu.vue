<template>
  <div v-click-outside="closeStatusMenu">
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
                <textarea required v-model="crew" class="form-control" id="crew" rows="3"></textarea>
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
    <div v-bind:class="['menu', statusMenuPosition == 'right' ? 'menu-right' : 'menu-left']">
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
import ResourceStatus from "../../../../constants/resourceStatus";

export default {
  name: "StatusSelectionMenu",
  props: ["statusMenuPosition", "resource"],
  data: () => {
    return {
      showMissionMenu: false,
      showMissionMenuPosition: "right",
      key: "",
      description: "",
      crew: ""
    };
  },
  computed: {
    isSetStatusToMissionDisabled() {
      return this.key.trim() === "" || this.description.trim() === "" || this.crew.trim() === "";
    }
  },
  methods: {
    toggleMissionMenu: function() {
      this.showMissionMenu = !this.showMissionMenu;
    },
    closeMissionMenu: function() {
      this.showMissionMenu = false;
    },
    closeStatusMenu: function() {
      this.$store.dispatch(A.CLOSE_STATUS_MENU);
    },
    setStatusToDisponibil: function() {
      this.closeMissionMenu();
      this.closeStatusMenu();

      this.$store.dispatch(
        A.WEBSOCKET_SEND,
        new WebsocketSend(
          "updateStatus",
          new UpdateResourceStatus(
            this.resource.plateNumber,
            new Status(ResourceStatus.AVAILABLE, null, null, null)
          )
        )
      );
    },
    setStatusToIndisponibil: function() {
      this.closeMissionMenu();
      this.closeStatusMenu();
      this.$store.dispatch(
        A.WEBSOCKET_SEND,
        new WebsocketSend(
          "updateStatus",
          new UpdateResourceStatus(
            this.resource.plateNumber,
            new Status(ResourceStatus.UNAVAILABLE, null, null, null)
          )
        )
      );
    },
    confirmMission: function() {
      this.closeMissionMenu();
      this.closeStatusMenu();
      let crewList = this.crew.trim().split("\n");
      crewList = crewList.filter(function(el) {
        return el != null && el.trim() != "";
      });
      this.$store.dispatch(
        A.WEBSOCKET_SEND,
        new WebsocketSend(
          "updateStatus",
          new UpdateResourceStatus(
            this.resource.plateNumber,
            new Status(
              ResourceStatus.IN_MISSION,
              this.key,
              this.description,
              crewList
            )
          )
        )
      );
    }
  },
  directives: {
    ClickOutside
  },
  created() {
    this.crew = [this.resource.captain].concat(this.resource.crew).join("\n");
  }
};
</script>
<style src="./statusSelectionMenu.css"></style>
