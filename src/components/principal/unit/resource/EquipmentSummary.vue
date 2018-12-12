<template>
  <div
    v-bind:class="['resource-wrapper', rowNr % 2 == 0 ? 'odd' : 'even']"
  >
    <div
      v-bind:class="['resource-wrapper', rowNr % 2 == 0 ? 'odd' : 'even']"
      v-on:click="mouseClick"
    >
      <div class="equipment-type-summary">
        <div class="equipment-element-container">{{equipment.equipmentType}}</div>
      </div>
      <div class="equipment-usable-summary">
        <div class="equipment-element-container">{{equipment.usable}}</div>
      </div>
      <div class="equipment-unusable-summary">
        <div class="equipment-element-container">{{equipment.unusable}}</div>
      </div>
      <div class="equipment-reserves-summary">
        <div class="equipment-element-container">{{equipment.reserves}}</div>
      </div>
  </div>
</template>

<script>
  import Equipment from '../../../../contracts/equipment.js';

  export default {
    name: 'EquipmentSummary'
    props: ["equipment"],

</script>

<style src="./equipment.css"></style>
