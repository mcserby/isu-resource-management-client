<template>
  <div class="menu" v-if="showMenu">
    <menu class="menu-options">
      <menuitem
        class="menu-option menu-option-disponibil"
        @click="setStatusToDisponibil()"
      >Disponibil</menuitem>
      <menuitem
        class="menu-option menu-option-misiune"
        @click="toggleMissionMenu()"
      >Misiune</menuitem>
      <menuitem
        class="menu-option menu-option-indisponibil"
        @click="setStatusToIndisponibil()"
      >Indisponibil</menuitem>
    </menu>
    <div class="mission-selection-dialog-container" v-if="showMissionMenu" style="display: block">
      <div class="dialog modal mission-status-dialog" role="dialog">
        <div class="modal-dialog mission-status-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Introduceți detalii despre misiune</h4>
            </div>
            <div class="modal-body status-dialog-content">
              <div class="form-group">
                <label class="form-label" for="key">Cheie:</label>
                <input type="text" required v-model="key" class="form-control" id="key">
              </div>
              <div class="form-group">
                <label class="form-label" for="description">Descriere:</label>
                <textarea
                  required
                  v-model="description"
                  class="form-control"
                  id="description"
                  rows="3"
                />
              </div>
              <div class="form-group">
                <label class="form-label" for="crew">Echipaj:</label>
                <textarea required v-model="crew" class="form-control" id="crew" rows="3"/>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn custom-button custom-status-selection-button"
                @click="confirmMission"
              >Confirmă misiunea</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ClickOutside from "vue-click-outside";

export default {
  name: "StatusSelectionMenu",
  data: () => {
    return {
      showMenu: true,
      showMissionMenu: false
    };
  },
  methods: {
    setStatusToDisponibil: function() {
      this.closeMenu();
    },
    openMissionMenu: function() {
      this.showMissionMenu = true;
    },
    closeMissionMenu: function() {
      this.showMissionMenu = false;
    },
    toggleMissionMenu: function() {
      this.showMissionMenu = !this.showMissionMenu;
    },
    setStatusToIndisponibil: function() {
      this.closeMenu();
    },
    closeMenu: function() {
      this.showMenu = false;
    },
    confirmMission: function() {}
  },
  directives: {
    ClickOutside
  }
};
</script>
<style src="./statusSelectionMenu.css"></style>
