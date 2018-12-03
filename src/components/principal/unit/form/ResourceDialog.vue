<template>
  <div class="dialogContainer" style="display: block">
    <div class="dialog modal" role="dialog">
      <div class="modal-dialog modal-dialog-centered add-resource-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tehnica de prima interventie</h5>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label" for="name">Tip</label>
              <input type="text" v-model="resource.vehicleType" class="form-control" id="name" readonly="true" placeholder="Tipul vehicului">
            </div>
            <div class="form-group">
              <label class="form-label" for="plateNumber">Număr de înmatriculare</label>
              <input type="text" minlength="5" class="form-control" id="plateNumber" aria-describedby="plateNumberHelp" placeholder="Număr de înmatriculare" v-model="resource.plateNumber" readonly="true">
            </div>
            <div class="form-group">
              <label class="form-label" for="identificationNumber">Număr de identificare</label>
              <input minlength="2" type="text" class="form-control"  id="identificationNumber" placeholder="Număr de identificare" v-model="resource.identificationNumber" readonly="true">
            </div>
            <div class="form-group">
              <label class="form-label" for="identificationNumber">Capitan</label>
              <input minlength="2" type="text" class="form-control"  id="capitan" placeholder="Capitan" v-model="resource.captain" readonly="true">
            </div>
            <div class="form-group">
              <label class="form-label" for="crew">Echipaj</label>
              <textarea minlength="5" class="form-control" id="crew" rows="3" readonly="true" v-model="this.crewMembers"></textarea>
            </div>

          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn custom-button"
              @click="cancel"
            >
              Închide
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import A from '../../../../constants/actions'
import Resource from '../resource/Resource.vue'

export default {
  name: 'ResourceDialog',
  props: ['resource'],
  data: () => {
    return {
      crewMembers: ''
    }
  },
  methods: {
    cancel: function () {
      this.$store.dispatch(A.CLOSE_VIEW_RESOURCE_DIALOG);
    },
    parseCrewMembers: function () {
      this.crewMembers = this.resource.crew.join('\n');
    }
  },

  components: {
    Resource
  },

  created () {
    this.parseCrewMembers()
  }
}
</script>

<style src="./addResourceForm.css"></style>
