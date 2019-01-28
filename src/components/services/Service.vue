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
  </div>
</template>

<script>
import A from "../../constants/services/actions";

export default {
  name: "Service",
  props: ["service", "rowNr"],
  components: {
  },
  data: () => {
    return {
    };
  },
  methods: {
    triggerServiceDelete() {
      this.$store.dispatch(A.OPEN_DELETE_SERVICE_DIALOG);
      this.$store.dispatch(A.SET_SERVICE, this.service);
    },
    triggerServiceEdit() {
      this.$store.dispatch(A.OPEN_EDIT_SERVICE_DIALOG);
      this.$store.dispatch(A.SET_SERVICE, this.service);
    }
  }
};
</script>

<style src="./service.css"></style>
