<template>
  <div>
    <div class="form-group add-subunit-form">
      <label class="form-label" for="name">Numele subunității</label>
      <input type="text" required v-model="name" class="form-control" id="name">
    </div>
    <button type="button" class="btn custom-button add-subunit-button" @click="save">Salvează</button>
  </div>
</template>
<script>
import Unit from "../../../contracts/unit";
import UpdateSubUnitRequest from '../../../contracts/management/subunits/updateSubUnitRequest';
import AddSubUnitRequest from '../../../contracts/management/subunits/addSubUnitRequest';

export default {
  name: "AddSubUnitForm",
  data: () => {
    return { editedName: "" };
  },
  computed: {
    name: {
      // getter
      get: function() {
        if (this.$store.state.managementStore.selectedSubUnit != null) {
          return this.$store.state.managementStore.selectedSubUnit.name;
        } else {
          return "";
        }
      },
      // setter
      set: function(newValue) {
        this.editedName = newValue;
      }
    }
  },
  methods: {
    save() {
      let subUnitId = this.$store.state.managementStore.selectedSubUnit.id;
      if (subUnitId != null) {
        this.$store.dispatch(
          A.WEBSOCKET_SEND,
          new WebsocketSend(
            "updateFunction",
            new UpdateSubUnitRequest(
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
            "addFunction",
            new AddSubUnitRequest(
              this.editedName == null
                ? this.$store.state.managementStore.selectedSubUnit.name
                : this.editedName
            )
          )
        );
      }
    },
    }
};
</script>
<style src="./addSubUnitForm.css"></style>
