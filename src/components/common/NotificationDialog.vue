<template>
  <div class="dialogContainer" style="display: block">
    <div class="dialog modal" role="dialog" style="display: block">
      <div class="modal-dialog modal-dialog-centered confirmation-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{title}}</h5>
            <button type="button" class="btn custom-close-button" @click="onCancel">X</button>
          </div>
          <div class="modal-body">
            <h5 class="modal-body">{{text}}.</h5>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class=" custom-dialog-button custom-button btn"
              @click="onOk"
            >Ok</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NotificationDialog",
  props: ["title", "text"],
  methods: {
    onOk() {
      this.$emit("ok");
    },
    onCancel() {
      this.$emit("cancel");
    }
  }
};
</script>
<style src="./confirmationDialog.css"></style>
