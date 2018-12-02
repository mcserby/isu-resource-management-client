<template>
<div class="menu" v-show="showMenu" v-click-outside="closeMenu" @click="closeMenu">
  <menu class="menu-options">
    <menuitem class="menu-option menu-option-disponibil" @click="setStatusToDisponibil()">Disponibil</menuitem>
    <menuitem class="menu-option menu-option-misiune" @click="setStatusToMisiune()">Misiune</menuitem>
    <menuitem class="menu-option menu-option-indisponibil" @click="setStatusToIndisponibil()">Indisponibil</menuitem>
  </menu>
</div>
</template>
<script>
import Vue from 'vue';
import ClickOutside from '../../../../directives/clickOutside.js';

export default {
  name: 'StatusSelectionMenu',
  props: ['showMenu'],
  methods: {
    setStatusToDisponibil: function() {
    },
    setStatusToMisiune: function() {
    },
    setStatusToIndisponibil: function() {
    },
    closeMenu: function() {
      this.showMenu = false;
    }
  },
}
</script>
<style src="./statusSelectionMenu.css"></style>
