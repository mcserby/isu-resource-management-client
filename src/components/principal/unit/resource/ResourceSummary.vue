<template>
  <div v-bind:class="['resource-wrapper', rowNr % 2 == 0 ? 'odd' : 'even']" @contextmenu.prevent="showStatusMenu" v-click-outside="hideStatusMenu" v-on:click="mouseClick">
    <div class="resource-name-summary">
      <div class="resource-element-container">
        {{resource.vehicleType}}
      </div>
    </div>
    <div class="resource-identification-number-summary">
      <div class="resource-element-container">
        {{resource.identificationNumber}}
      </div>
    </div>
    <div class="resource-crew-number-summary">
      <div class="resource-element-container">
        {{this.resource.crew ? this.resource.crew.length + 1 : 1}}
      </div>
    </div>
    <StatusSelectionMenu :statusMenuPosition="statusMenuPosition" v-if="showMenu"/>
  </div>
</template>

<script>
import StatusSelectionMenu from './StatusSelectionMenu.vue';
import ClickOutside from 'vue-click-outside';
import Resource from './Resource.vue'
import A from '../../../../constants/actions'

export default {
  name: 'ResourceSummary',
  props: ['resource', 'rowNr'],
  data: () => {
    return {
      showMenu: false,
      statusMenuPosition : 'right'
    }
  },
  components: {
    StatusSelectionMenu,
        Resource
  },
  methods: {
      mouseClick: function () {
        this.$store.dispatch(A.OPEN_VIEW_RESOURCE_DIALOG, this.resource);
      },
    showStatusMenu: function(event) {
      this.statusMenuPosition = event.clientX > window.innerWidth / 2 ? 'left' : 'right';
      this.showMenu = true;
    },
    hideStatusMenu: function() {
      this.showMenu = false;
    },
  },
  directives: {
    ClickOutside
  },
}
</script>

<style src="./resource.css"></style>
