<template>
  <div class="location-item">
      {{location.name}}
  </div>
</template>


<script>
export default {
  name: "LocationItem",
  props: ["location"],
}
</script>

<style src="./locations.css"></style>
