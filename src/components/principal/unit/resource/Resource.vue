<template>
  <div class="modal-dialog modal-lg resource">
    <div class="resource-wrapper">
      <div class="resource-name">
        <div class="resource-element-container">
          {{resource.vehicleType}}
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
        <div>
          <div class="resource-element-container">
            {{resource.captain}}
          </div>
        </div>
      </div>
      <div class="resource-crew-member" >
        <div v-for="(member,index) in resource.crew">
          <div v-bind:class="['resource-element-container', index % 2 == 0 ? 'odd' : 'even']">
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
