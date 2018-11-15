<template>
  <div class="modal-dialog modal-lg">
    <div class="resource-wrapper">
      <div class="resource-name">
        <div class="resource-element-container">
          {{resource.name}}
        </div>
      </div>
      <div class="resource-plate-number">
        <div class="resource-element-container">
          {{resource.plateNumber}}
        </div>
      </div>
      <div class="resource-identification-number">
        <div class="resource-element-container">
          {{resource.identificationNumber}}
        </div>
      </div>
      <div class="resource-head-of-crew">
        <div v-for="member in resource.crew">
          <div class="resource-element-container">
            {{member}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Resource',
    props: ['resource'],
    components: {},
    methods: {}
  }
</script>

<style src="./resource.css"></style>
