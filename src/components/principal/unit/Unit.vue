<template>
  <div>
    <div class="unit-header">
      {{unit.id}}
    </div>
    <div v-for="resource in unit.resources" v-bind:key="resource.name">
      {{resource.name}}
    </div>
    <button class="btn btn-primary" @click="clearResources()">Clear Resources</button>
  </div>

</template>

<script>

import A from '../../../constants/actions';

export default {
  name: 'Unit',
  props: ['unit'],
  components: {},
  methods: {
    clearResources() {
      this.$store.dispatch(A.CLEAR_UNIT_RESOURCES, this.unit.id);
    }
  }
}
</script>

<style src="./unit.css"></style>
