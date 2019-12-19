<template>
    <div
      v-bind:class="['resource-wrapper', rowNr % 2 == 0 ? 'odd' : 'even']"
      v-on:click="mouseClick">

      <div class="equipment-type-summary">
        <div class="equipment-element-container">{{equipment.equipmentType}}</div>
      </div>
      <div class="equipment-usable-summary">
        <div class="equipment-element-container">{{equipment.usable}}</div>
      </div>
      <div class="equipment-reserves-summary">
        <div class="equipment-element-container">{{equipment.reserves}}</div>
      </div>
      <div class="equipment-unusable-summary">
        <div class="equipment-element-container">{{equipment.unusable}}</div>
      </div>
  </div>
</template>

<script>

  import A from "../../../../constants/actions";

  export default {
    name: 'EquipmentSummary',
    props: ["equipment", "rowNr", "editingEnabled"],
    methods: {
      mouseClick: function () {
        if(!this.editingEnabled){
          return;
        }
        this.$store.dispatch(A.OPEN_VIEW_RESOURCE_DIALOG, this.equipment);
      }
    }
  }

</script>

<style src="./equipment.css"></style>
