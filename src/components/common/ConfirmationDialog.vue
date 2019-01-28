<template>
  <div class="dialogContainer" style="display: block">
    <div class="dialog modal" role="dialog">
      <div class="modal-dialog modal-dialog-centered confirmation-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{title}}</h5>
            <button type="button" class="btn custom-close-button" @click="onCancel">X</button>
          </div>
          <div class="modal-body">
            <h5 class="modal-body">{{text}}?</h5>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn custom-button custom-dialog-button"
              @click="onConfirm"
            >Da</button>
            <button
              type="button"
              class="btn custom-button custom-dialog-button"
              @click="onCancel"
            >Nu</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ConfirmationDialog",
  props: ["title", "text"],
  methods: {
    onConfirm() {
      this.$emit("confirm");
    },
    onCancel() {
      this.$emit("cancel");
    }
  }
};
</script>
<style src="./confirmationDialog.css"></style>
