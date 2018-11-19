<template>
  <div class="resource-wrapper"  v-on:mouseover="mouseOver"  v-on:mouseleave="mouseOut">
    <div class="resource-name-summary">
      <div class="resource-element-container">
        {{resource.vehicleType}}
      </div>
    </div>
    <div class="resource-plate-number-summary">
      <div class="resource-element-container">
        {{resource.plateNumber}}
      </div>
    </div>
    <div class="resource-container" v-if="showResourceDetails">
      <Resource :resource="resource"></Resource>
    </div>
   <!-- <div class="modal fade" id="myModal" role="dialog" v-if="showResourceDetails">
      <div class="modal-dialog">
        &lt;!&ndash; Modal content&ndash;&gt;
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Modal Header</h4>
          </div>
          <div class="modal-body">
            <div  class="resource-details-wrapper">
              <Resource :resource="resource"></Resource>
            </div>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>

  import Resource from './Resource.vue';

  export default {
    name: 'ResourceSummary',
    props: ['resource'],
    data: () => {
      return {
        showResourceDetails: false,
      }
    },
    components: {
      Resource,
    },
    methods: {
      mouseOver: function(){
        this.showResourceDetails = true;
      },
      mouseOut: function(){
        this.showResourceDetails = false;
      },
    }
  }
</script>

<style src="./resource.css"></style>
