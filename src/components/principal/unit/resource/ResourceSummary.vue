<template>
<div v-bind:class="['resource-wrapper', rowNr % 2 == 0 ? 'odd' : 'even']" @contextmenu.prevent="onRightClick">
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
  <StatusSelectionMenu v-if="showMenu" :showMenu="showMenu" />
</div>
</template>

<script>
import StatusSelectionMenu from './StatusSelectionMenu.vue';

export default {
  name: 'ResourceSummary',
  props: ['resource', 'rowNr'],
  data: () => {
    return {
      showMenu: false,
    }
  },
  components: {
    StatusSelectionMenu,
  },
  methods: {
    onRightClick: function() {
      this.showMenu = !this.showMenu;
    },
  }
}
</script>

<style src="./resource.css"></style>
