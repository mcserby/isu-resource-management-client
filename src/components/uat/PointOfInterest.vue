<template>
  <div class="point-of-interest">
      {{point.name}}
  </div>
</template>


<script>
export default {
  name: "PointOfInterest",
  props: ["point"],
}
</script>
