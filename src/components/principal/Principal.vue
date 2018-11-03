<template>
  <div class="principal">
    <h1>Principal</h1>
    <div class="units-container">
      <div class="unit-wrapper" v-for="unit in units" v-bind:key="unit.id">
        <Unit :unit="unit"></Unit>
      </div>
    </div>
  </div>
</template>
<script>
import Unit from './unit/Unit.vue'

export default {
  name: 'Principal',
  components: {
    Unit,
  },
  computed: {
    units() {
      return this.$store.state.principalStore.units;
    }
  },
}
</script>

<style src="./principal.css"></style>
