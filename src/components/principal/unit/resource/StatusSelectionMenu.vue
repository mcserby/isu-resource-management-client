<template>
<div class="menu" v-show="show" v-on-clickaway="close" @click="close">
  <menu class="menu-options">
    <menuitem class="menu-option menu-option-disponibil" onclick="setStatusToDisponibil()">Disponibil</menuitem>
    <menuitem class="menu-option menu-option-misiune" onclick="setStatusToMisiune()">Misiune</menuitem>
    <menuitem class="menu-option menu-option-indisponibil" onclick="setStatusToIndisponibil()">Indisponibil</menuitem>
  </menu>
</div>
</template>
<script>
export default {
  name: 'StatusSelectionMenu',
  props: [show],
  methods: {
    setStatusToDisponibil: function() {

    },
    setStatusToMisiune: function() {

    },
    setStatusToIndisponibil: function() {

    },
    close: function() {
      this.show = false;
    }
  }
}
</script>
<style src="./statusSelectionMenu.css"></style>
