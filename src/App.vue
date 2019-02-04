<template>
  <div id="app" class="app-sa">
    <router-view/>
    <ConnectionLostLayer></ConnectionLostLayer>
  </div>
</template>

<script>
  import Vue from 'vue'
  import A from './constants/actions'
  import ConnectionLostLayer from './components/common/ConnectionLostLayer.vue';

  export default {
    name: 'App',
    components: {
      ConnectionLostLayer
    },
    beforeMount: function () {
      console.log("App.vue mounted");
      this.$store.dispatch(A.WEBSOCKET_CONNECT);
    }
  }
</script>
<style src="./app.css"></style>
