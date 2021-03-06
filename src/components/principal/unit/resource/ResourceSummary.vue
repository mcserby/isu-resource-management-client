<template>
  <div
    v-bind:class="['resource-wrapper', rowNr % 2 == 0 ? 'odd' : 'even', this.isResourceInMission ? 'status-in-mission-wrapper ':'']"
    @contextmenu.prevent="showStatusMenu"
  >
    <div
      v-bind:class="['resource-wrapper', rowNr % 2 == 0 ? 'odd' : 'even']"
      v-on:click="mouseClick"
    >
      <div
        v-bind:class="['status', statusClass]"
      ></div>
      <div class="resource-name-summary">
        <div class="resource-element-container">{{resource.vehicleType}}</div>
      </div>
      <div class="resource-identification-number-summary">
        <div v-bind:class="['resource-element-container', this.isResourceInMission ? 'status-in-mission-identification-number' : '']">{{resource.identificationNumber}}</div>
      </div>
      <div class="resource-crew-number-summary">
        <div
          class="resource-element-container"
        >{{this.crewSize}}</div>
      </div>
    </div>
    <StatusSelectionMenu
      :statusMenuXPosition="statusMenuXPosition"
      :statusMenuYPosition="statusMenuYPosition"
      :resource="resource"
      v-if="isStatusMenuVisible"
    ></StatusSelectionMenu>
  </div>
</template>

<script>
import StatusSelectionMenu from "./StatusSelectionMenu.vue";
import ClickOutside from "vue-click-outside";
import Resource from "./Resource.vue";
import A from "../../../../constants/actions";
import ResourceStatus from '../../../../constants/resourceStatus.js';

export default {
  name: "ResourceSummary",
  props: ["resource", "rowNr", "editingEnabled"],
  data: () => {
    return {
      statusMenuXPosition: "right",
      statusMenuYPosition: "down"
    };
  },
  components: {
    StatusSelectionMenu,
    Resource
  },
  computed: {
    crewSize() {
      let crewSize = 0;
      const captainCount = this.resource.captain !== "" ? 1 : 0;
      if (this.resource.status.status === ResourceStatus.IN_MISSION) {
        crewSize = this.resource.status.crew ? this.resource.status.crew.length : 0;
      } else {
        crewSize = this.resource.crew ? this.resource.crew.length + captainCount : captainCount;
      }
      return crewSize;
    },
    statusClass(){
      switch(this.resource.status.status){
        case ResourceStatus.AVAILABLE: return 'status-available';
        case ResourceStatus.IN_MISSION: return 'status-in-mission';
        case ResourceStatus.UNAVAILABLE: return 'status-unavailable';
        case ResourceStatus.NONOPERATIONAL: return 'status-non-operational';
        case ResourceStatus.OPERATIONAL: return 'status-operational';
      }
      return 'status-available';
    },
    isStatusMenuVisible() {
      return this.$store.state.principalStore.statusMenuIsOpen &&
        this.$store.state.principalStore.activeStatusMenuId === this.resource.id;
    },

    isResourceInMission(){
      return this.resource.status.status === ResourceStatus.IN_MISSION;
    },

    isResourceAvailable(){
      return this.resource.status.status === ResourceStatus.AVAILABLE;
    }
  },
  methods: {
    mouseClick: function() {
      this.$emit('mouseClick', this.resource);
    },
    showStatusMenu: function(event) {
      if(!this.editingEnabled){
        return;
      }
      this.statusMenuXPosition =
        event.clientX > window.innerWidth - 280 ? "left" : "right";
      this.statusMenuYPosition =
        event.clientY > window.innerHeight / 2 ? "down" : "up";
      this.$store.dispatch(A.OPEN_STATUS_MENU, this.resource.id);
    }
  },
  directives: {
    ClickOutside
  }
};
</script>

<style src="./resource.css"></style>
