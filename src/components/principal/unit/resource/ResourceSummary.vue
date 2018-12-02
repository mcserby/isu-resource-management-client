<template>
  <div v-bind:class="['resource-wrapper', rowNr % 2 == 0 ? 'odd' : 'even']" @contextmenu.prevent="showStatusMenu" v-click-outside="hideStatusMenu">
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
    <StatusSelectionMenu v-if="showMenu" :showMenu="showMenu"/>
  </div>
</template>

<script>
import StatusSelectionMenu from './StatusSelectionMenu.vue';
import ClickOutside from 'vue-click-outside';

export default {
  name: 'ResourceSummary',
  props: ['resource', 'rowNr'],
  data: () => {
    return {
      showMenu: false
    }
  },
  components: {
    StatusSelectionMenu
  },
  methods: {
    showStatusMenu: function() {
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
