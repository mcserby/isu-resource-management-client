<template>
<div class="modal">
  <div class="modal-window">
    <p>Sunteți sigur ca doriți să ștergeți toate datele pentru detașamentul <strong>{{activeUnit.subUnitName}}</strong> ?</p>
    <div class="actions">
      <button class="confirm" @click="onConfirm">Da</button>
      <button class="cancel" @click="onCancel">Nu</button>
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
  props: ['activeUnit'],
  methods: {
    onConfirm() {
      this.$store.dispatch(A.CLOSE_CONFIRMATION_DIALOG);
      this.updateUnit();
    },
    onCancel() {
      this.$store.dispatch(A.WEBSOCKET_SEND, new WebsocketSend('unlockSubUnit', new UnlockSubUnitRequest(this.$store.state.principalStore.activeUnit.name)));
      this.$store.dispatch(A.CLOSE_CONFIRMATION_DIALOG);
    },
    updateUnit() {
      this.$store.dispatch(A.WEBSOCKET_SEND, new WebsocketSend('updateSubUnit', new UpdateSubUnitRequest(this.activeUnit)));
    },
  },
}
</script>
<style src="./confirmationDialog.css"></style>
