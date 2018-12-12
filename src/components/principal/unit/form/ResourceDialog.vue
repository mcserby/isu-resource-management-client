<template>
  <div class="resourceDialogContainer" style="display: block">
    <div class="dialog modal" role="dialog">
      <div class="modal-dialog modal-dialog-centered add-resource-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" v-model="activeTab.name"/>
            <button type="button" class="btn close-button" @click="cancel">X</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label" for="name">Detașament</label>
              <input
                type="text"
                v-model="unit.name"
                class="form-control"
                id="unit"
                readonly="true"
                placeholder="Detașament"
              >
            </div>
            <div class="form-group">
              <label class="form-label" for="name">Tip autospecială</label>
              <input
                type="text"
                v-model="resource.vehicleType"
                class="form-control"
                id="name"
                readonly="true"
                placeholder="Tip autospecială"
              >
            </div>
            <div class="form-group">
              <label class="form-label" for="plateNumber">Număr de înmatriculare</label>
              <input
                type="text"
                minlength="5"
                class="form-control"
                id="plateNumber"
                aria-describedby="plateNumberHelp"
                placeholder="Număr de înmatriculare"
                v-model="resource.plateNumber"
                readonly="true"
              >
            </div>
            <div class="form-group">
              <label class="form-label" for="identificationNumber">Număr de identificare</label>
              <input
                minlength="2"
                type="text"
                class="form-control"
                id="identificationNumber"
                placeholder="Număr de identificare"
                v-model="resource.identificationNumber"
                readonly="true"
              >
            </div>
            <div class="form-group">
              <label class="form-label" for="crew">Echipaj</label>
              <textarea
                minlength="5"
                class="form-control"
                id="crew"
                rows="3"
                readonly="true"
                v-model="this.crewMembers"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn custom-button" @click="cancel">Închide</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import A from "../../../../constants/actions";
import Resource from "../resource/Resource.vue";
import ResourceStatus from "../../../../constants/resourceStatus.js";

export default {
  name: "ResourceDialog",
  props: ["resource", "unit"],
  data: () => {
    return {
      crewMembers: ""
    };
  },
  methods: {
    cancel: function() {
      this.$store.dispatch(A.CLOSE_VIEW_RESOURCE_DIALOG);
    },
    parseCrewMembers: function() {
      if (this.resource.status.status === ResourceStatus.IN_MISSION) {
        this.crewMembers = this.resource.status.crew.join("\n");
      } else {
        this.crewMembers = this.resource.crew.join("\n");
        this.crewMembers = this.resource.captain + "\n" + this.crewMembers;
      }
    }
  },
  computed: {
    activeTab () {
      return this.$store.state.principalStore.activeTab
    },

  components: {
    Resource
  },

  created() {
    this.parseCrewMembers();
  }
};
</script>

<style src="./addResourceForm.css"></style>
