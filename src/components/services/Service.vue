<template>
  <div v-bind:class="['services-wrapper', rowNr % 2 == 0 ? 'odd' : 'even']">
    <div v-bind:class="['services-wrapper', rowNr % 2 == 0 ? 'odd' : 'even']">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "Service",
  props: ["service", "rowNr"],
  components: {},
  methods: {}
};
</script>

<style src="./service.css"></style>
