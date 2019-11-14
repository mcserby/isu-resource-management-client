<template>
<div class="dialogContainer" style="display: block;">
  <div class="dialog modal" role="dialog" style="display: block">
    <div class="modal-dialog modal-dialog-centered add-resource-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editează locația</h5>
          <button type="button" class="btn custom-close-button" @click="cancel()">X</button>
        </div>
        <div class="modal-body body-wrapper">
          <div class="location-editor">
            <div class="form-group">
              <label class="form-label" for="locationName">Nume Locație</label>
              <input type="text" minlength="1" required v-model="newLocation.name" class="form-control" id="locationName" placeholder="Nume">
            </div>
            <div class="form-group">
              <label class="form-label" for="locationPointsOfInterest">Obiective</label>
              <input type="text" minlength="1" required v-model="newLocation.pointsOfInterest" class="form-control" id="locationPointsOfInterest" placeholder="Obiective">
            </div>
            <div class="errors">
              <div v-for="error in errors" v-bind:key="error">
                <p class="error">{{error}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="custom-button btn" @click="saveAndClose()" :disabled="saveDisabled()">
            Salvează și închide
          </button>
          <button type="button" class="custom-button btn" @click="cancel">
            Închide fără a salva
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'LocationEditor',
  props: ["newLocation"],
  data: () => {
    return {
      errors: [],
    }
  },
  components: {
  },
  computed: {
  },
  methods: {
    saveDisabled() {
      return false;
    },
    saveAndClose() {
      this.$emit('saveLocation', this.newLocation);
    },
    cancel() {
       this.$emit('cancelEditLocation');
    },
  },
}
</script>
