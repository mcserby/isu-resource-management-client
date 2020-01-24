<template>
  <div>
    <div class="location-item" @click="isCollapsed = !isCollapsed">
      <span v-if="isCollapsed">+</span>
      <span v-if="!isCollapsed">-</span>
      <span>{{location.name}}</span>
      <span>({{location.pointsOfInterest.length}})</span>
    </div>
    <transition name="fade">
    <div v-if="!isCollapsed" class="points-of-interest-container">
      <div v-for="(pointOfInterest, index) in location.pointsOfInterest">
        {{index+1}}. {{pointOfInterest.name}}
      </div>
    </div>
    </transition>
  </div>
</template>


<script>
  export default {
    name: 'LocationItem',
    props: ['location'],
    data: () => {
      return {
        isCollapsed: true
      };
    },
  }
</script>

<style src="./locations.css"></style>
