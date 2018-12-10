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
          <h5 class="modal-body">Sunteți sigur că doriți să ștergeți toate datele ?</h5>
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
import A from '../../../constants/actions';
import WebsocketSend from '../../../contracts/websocketSend';

export default {
  name: 'ConfirmationDialogServices',
  props: [],
  methods: {
    onConfirm() {
    },
    onCancel() {
    },
  },
}
</script>
<style src="./confirmationDialogServices.css"></style>
