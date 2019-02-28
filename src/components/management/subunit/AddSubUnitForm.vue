<template>
  <div>
    <div class="form-group add-subunit-form">
      <label class="form-label" for="name">Numele subunității</label>
      <input type="text" required v-model="name" class="form-control" id="name">
    </div>
    <button
      type="button"
      class="btn custom-button add-subunit-button"
      @click="save"
      :disabled="isSaveDisabled()"
    >Salvează</button>
  </div>
</template>
<script>
import Unit from "../../../contracts/unit";
import UpdateSubUnitNameRequest from "../../../contracts/management/subunits/updateSubUnitNameRequest";
import AddSubUnitRequest from "../../../contracts/management/subunits/addSubUnitRequest";
import A from "../../../constants/actions";
import WebsocketSend from "../../../contracts/websocketSend";

export default {
  name: "AddSubUnitForm",
  data: () => {
    return { editedName: null };
  },
  computed: {
    name: {
      // getter
      get: function() {
        if (this.editedName != null) {
          return this.editedName;
        } else if (this.$store.state.managementStore.selectedSubUnit != null) {
          return this.$store.state.managementStore.selectedSubUnit.name;
        } else {
          return null;
        }
      },
      // setter
      set: function(newValue) {
        this.editedName = newValue;
      }
    }
  },
  methods: {
    isSaveDisabled() {
      return this.editedName == null || this.editedName === "";
    },
    save() {
      let subUnitId = this.$store.state.managementStore.selectedSubUnit.id;
      if (subUnitId != null) {
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "updateSubUnitName",
            new UpdateSubUnitNameRequest(
              subUnitId,
              this.editedName == null
                ? this.$store.state.managementStore.selectedSubUnit.name
                : this.editedName
            )
          )
        );
      } else {
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "addSubUnit",
            new AddSubUnitRequest(
              this.editedName == null
                ? this.$store.state.managementStore.selectedSubUnit.name
                : this.editedName
            )
          )
        );
      }
    }
  }
};
</script>
<style src="./addSubUnitForm.css"></style>
