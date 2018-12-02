<template>
<div class="dialogContainer" style="display: block">
  <div class="dialog modal" role="dialog">
    <div class="modal-dialog modal-dialog-centered confirmation-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Schimb de tură</h5>
          <button type="button" class="btn  custom-button custom-close-button" @click="onCancel">X</button>
        </div>
        <div class="modal-body">
          <h5 class="modal-body">Sunteți sigur că doriți să ștergeți toate datele pentru detașamentul {{unit.name}} ?</h5>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn custom-button custom-dialog-button" @click="onConfirm">Da</button>
          <button type="button" class="btn custom-button custom-dialog-button" @click="onCancel">Nu</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Unit from '../Unit.vue';
import A from '../../../../constants/actions';
import Resource from '../../../../contracts/resource';
import UnlockSubUnitRequest from '../../../../contracts/edit/unlockSubUnitRequest';
import WebsocketSend from '../../../../contracts/websocketSend';
import UpdateSubUnitRequest from "../../../../contracts/edit/updateSubUnitRequest";

export default {
  name: 'ConfirmationDialog',
  props: ['unit'],
  methods: {
    onConfirm() {
      this.$store.dispatch(A.CLOSE_CONFIRMATION_DIALOG);
      this.$store.dispatch(A.CLEAR_UNIT_RESOURCES, this.unit.name);
      this.$store.dispatch(A.WEBSOCKET_SEND, new WebsocketSend('updateSubUnit', new UpdateSubUnitRequest(this.unit)));
      this.$store.dispatch(A.WEBSOCKET_SEND, new WebsocketSend('unlockSubUnit', new UnlockSubUnitRequest(this.unit.name)));
    },
    onCancel() {
      this.$store.dispatch(A.WEBSOCKET_SEND, new WebsocketSend('unlockSubUnit', new UnlockSubUnitRequest(this.unit.name)));
      this.$store.dispatch(A.CLOSE_CONFIRMATION_DIALOG);
    },
  },
}
</script>
<style src="./confirmationDialog.css"></style>
