<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import Vue from 'vue'
  import A from './constants/actions'

  export default {
    name: 'App',
    beforeMount: function () {
      console.log("App.vue mounted");
      this.$store.dispatch(A.WEBSOCKET_CONNECT);
    }
  }
</script>
