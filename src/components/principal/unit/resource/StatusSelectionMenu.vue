<template>
  <div v-click-outside="closeStatusMenu">
    <div
      v-bind:class="['mission-selection-dialog-container']"
      v-if="showMissionMenu"
      style="display: block"
    >
      <div class="dialog modal mission-status-dialog" role="dialog" style="display: block">
        <div class="modal-dialog mission-status-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Introduceți detalii despre misiune</h4>
              <button type="button" class="btn custom-close-button" @click="toggleMissionMenu">X</button>
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
                ></textarea>
              </div>
              <div class="form-group">
                <label class="form-label" for="crew">Echipaj:</label>
                <textarea required v-model="crew" class="form-control" id="crew" rows="3"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="custom-status-selection-button custom-button btn"
                @click="confirmMission"
                :disabled="isSetStatusToMissionDisabled"
              >Confirmă misiunea</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-bind:class="['menu', isReserve? 'menu-reserves': 'menu-mission',  statusMenuXPosition == 'right' ? 'menu-right' : 'menu-left', statusMenuYPosition == 'down' ? 'menu-down' : 'menu-up']">
      <menu class="menu-options">
        <menuitem v-if="isNotReserve"
          class="menu-option menu-option-disponibil"
          @click="setStatusToDisponibil()"
        >Disponibil</menuitem>
        <menuitem v-if="isNotReserve" class="menu-option menu-option-misiune" @click="toggleMissionMenu">Misiune</menuitem>
        <menuitem v-if="isNotReserve"
          class="menu-option menu-option-indisponibil"
          @click="setStatusToIndisponibil()"
        >Indisponibil</menuitem>
        <menuitem v-if="isNotReserve"
                  class="menu-option menu-option-reserve"
                  @click="setResourceTypeToReserve()"
        >Rezerve</menuitem>
        <menuitem v-if="isReserve"
                  class="menu-option menu-option-first-intervention"
                  @click="setResourceTypeToFirstIntervention()"
        >Primă intervenție</menuitem>
        <menuitem v-if="isReserve"
                  class="menu-option menu-option-other-resources"
                  @click="setResourceTypeToOtherResource()"
        >Alte Resurse</menuitem>
      </menu>
    </div>
  </div>
</template>
<script>
import ClickOutside from "vue-click-outside";
import A from "../../../../constants/actions";
import Status from "../../../../contracts/status";
import UpdateResourceStatus from "../../../../contracts/edit/updateResourceStatus";
import UpdateResourceType from "../../../../contracts/edit/updateResourceType";
import WebsocketSend from "../../../../contracts/websocketSend";
import ResourceStatus from "../../../../constants/resourceStatus";
import ResourceType from "../../../../constants/resourceType";

export default {
  name: "StatusSelectionMenu",
  props: ["statusMenuXPosition", "statusMenuYPosition", "resource"],
  data: () => {
    return {
      showMissionMenu: false,
      showMissionMenuXPosition: "right",
      showMissionMenuYPosition: "down",
      key: "",
      description: "",
      crew: ""
    };
  },
  computed: {
    isSetStatusToMissionDisabled() {
      return this.key.trim() === "" || this.description.trim() === "" || this.crew.trim() === "";
    },
    isNotReserve() {
      return this.resource.type !== ResourceType.RESERVE;
    },
    isReserve(){
      return this.resource.type === ResourceType.RESERVE;
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
    },
    setResourceTypeToFirstIntervention() {
      this.closeMissionMenu();
      this.closeStatusMenu();
      this.$store.dispatch(
        A.WEBSOCKET_SEND,
        new WebsocketSend(
          "updateResourceType",
          new UpdateResourceType(
            this.resource.plateNumber,
            ResourceType.FIRST_INTERVENTION)
          )
        );
    },
    setResourceTypeToOtherResource() {
      this.closeMissionMenu();
      this.closeStatusMenu();
      this.$store.dispatch(
        A.WEBSOCKET_SEND,
        new WebsocketSend(
          "updateResourceType",
          new UpdateResourceType(
            this.resource.plateNumber,
            ResourceType.OTHER)
        )
      );
    },
    setResourceTypeToReserve() {
      this.closeMissionMenu();
      this.closeStatusMenu();
      this.$store.dispatch(
        A.WEBSOCKET_SEND,
        new WebsocketSend(
          "updateResourceType",
          new UpdateResourceType(
            this.resource.plateNumber,
            ResourceType.RESERVE)
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
