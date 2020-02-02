<template>
  <div>
    <div class="location-item" @click="isCollapsed = !isCollapsed">
      <span v-if="location.pointsOfInterest.length == 0">&nbsp&nbsp</span>
      <span v-if="isCollapsed && location.pointsOfInterest.length > 0">+</span>
      <span v-if="!isCollapsed && location.pointsOfInterest.length > 0">-</span>
      <span>{{name}}</span>
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
  import Utils from '../../services/utils'

  export default {
    name: 'LocationItem',
    props: ['location'],
    data: () => {
      return {
        isCollapsed: true,
      }
    },
    computed: {
      name() {
        return Utils.limitToNCharacters(this.location.name, 35);
      }
    }
  }
</script>

<style src="./locations.css"></style>
