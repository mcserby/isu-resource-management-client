<template>
  <div id="connectionLostLayer" v-if="this.isNotConnected()">
    <h3 id="connectionLostText">
      Conexiunea la server a fost pierdută. Reîncercare de conectare în curs...
    </h3>
  </div>
</template>
<script>

  export default {
    name: 'ConnectionLostLayer',
    methods: {
      isNotConnected () {
        return !this.$store.state.websocket.connected;
      }
    }
  }
</script>
<style src="./connectionLostLayer.css"></style>
