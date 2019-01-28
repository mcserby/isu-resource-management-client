<template>
  <div class="unit-buttons">
    <div>
      <button
        class="btn custom-button"
        :disabled="isShiftExchangeNotAllowed"
        @click="shiftExchange()"
      >
        <span class="button-font-size">Schimb de tură</span>
      </button>
    </div>
    <div>
      <button class="btn custom-button" :disabled="isUnitLocked" @click="addResources()">
        <span class="button-font-size">Actualizează</span>
      </button>
    </div>
    <div class="last-updated">
      <span>
        <b>{{ getLastUpdatedTimestampForResourceType | moment("DD.MM.YYYY, HH:mm:ss") }}</b>
      </span>
    </div>
  </div>
</template>

<script>
import A from "../../../../constants/actions";
import WebsocketSend from "../../../../contracts/websocketSend";
import LockSubUnitRequest from "../../../../contracts/edit/lockSubUnitRequest";
import UpdateSubUnitRequest from "../../../../contracts/edit/updateSubUnitRequest";
import ResourceType from "../../../../constants/resourceType";

export default {
  name: "UnitButtons",
  props: ["unit"],
  components: {},
  methods: {
    shiftExchange() {
      this.$store.dispatch(
        A.WEBSOCKET_SEND,
        new WebsocketSend(
          "lockSubUnit",
          new LockSubUnitRequest(this.unit.name, this.resourceType)
        )
      );
      this.$store.dispatch(A.OPEN_CONFIRMATION_DIALOG, this.unit.name);
    },
    addResources() {
      this.$store.dispatch(
        A.WEBSOCKET_SEND,
        new WebsocketSend(
          "lockSubUnit",
          new LockSubUnitRequest(this.unit.name, this.resourceType)
        )
      );
      this.$store.dispatch(A.OPEN_ADD_RESOURCE_DIALOG, this.unit.name);
    }
  },
  computed: {
    resourceType() {
      return this.$store.state.principalStore.activeTab.resourceType;
    },
    isShiftExchangeNotAllowed() {
      let currentResourceType = this.resourceType;
      if (currentResourceType !== ResourceType.EQUIPMENT) {
        let currentResources = this.unit.resources.filter(
          r => r.type === currentResourceType
        );
        return currentResources.length === 0 || this.isUnitLocked;
      } else {
        let currentEquipments = this.unit.equipment.filter(
          r => r.resourceType === currentResourceType
        );
        return currentEquipments.length === 0 || this.isUnitLocked;
      }
    },
    isUnitLocked() {
      const lockUnit = this.$store.state.principalStore.lockUnits.find(
        u => u.name === this.unit.name
      );
      if (lockUnit && lockUnit.resourceTypes) {
        return Boolean(
          lockUnit.resourceTypes.find(ft => ft === this.resourceType)
        );
      }
      return false;
    },
    getLastUpdatedTimestampForResourceType() {
      let lastUpdatedTimestamp = "";
      switch (this.resourceType) {
        case ResourceType.EQUIPMENT:
          lastUpdatedTimestamp = this.unit.lastUpdateEquipment;
          break;
        case ResourceType.FIRST_INTERVENTION:
          lastUpdatedTimestamp = this.unit.lastUpdateFirstInterventionResource;
          break;
        case ResourceType.OTHER:
          lastUpdatedTimestamp = this.unit.lastUpdateOtherResource;
          break;
      }

      return lastUpdatedTimestamp;
    }
  }
};
</script>

<style src="./../unit.css"></style>
