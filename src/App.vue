<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import Vue from 'vue';
  import WebsocketClient from './websocket/websocketClient.js';
  Vue.mixin({
    data: function() {
      return {
        websocketClient: new WebsocketClient()
      }
    }
  });
export default {
  name: 'App',
  beforeCreate: function() {
    this.websocketClient = new WebsocketClient();
    this.websocketClient.connect();
  }

}
</script>
