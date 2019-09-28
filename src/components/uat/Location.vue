<template>
  <div class="location">
      {{location.name}}
  </div>
</template>


<script>
export default {
  name: "Location",
  props: ["location"],
}
</script>

<style src="./locations.css"></style>
