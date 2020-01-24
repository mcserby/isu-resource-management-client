<template>
  <div class="unit-of-interest-editor">
    <div class="form-group">
      <label class="form-label" for="point-of-interest-name">Titlu</label>
      <input
        type="text"
        minlength="5"
        required
        :disabled="!editorEnabled"
        v-model="interest.name"
        @change="updateName()"
        class="form-control"
        name="point-of-interest-name"
        aria-describedby="nameHelp"
        placeholder="Nume punct de interes"
      >
    </div>
    <div class="form-group">
      <label class="form-label" for="point-of-interest-contact">Contact</label>
      <textarea
        minlength="5"
        required
        :disabled="!editorEnabled"
        v-model="interest.contact"
        class="form-control"
        @input="updateContact()"
        name="point-of-interest-contact"
        rows="3"
      ></textarea>
    </div>
    <div class="form-group">
      <label class="form-label" for="point-of-interest-comments">Observații</label>
      <textarea
        minlength="5"
        required
        :disabled="!editorEnabled"
        v-model="interest.comments"
        class="form-control"
        @input="updateComments()"
        name="point-of-interest-comments"
        rows="3"
      ></textarea>
    </div>
    <div class="errors">
      <div v-for="error in errors" v-bind:key="error">
        <p class="error">{{error}}</p>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "PointOfInterestEditor",
    components: {},
    props: {
      interest: Object,
    },
    data: () => {
      return {
        errors: [],
      };
    },
    computed: {
      editorEnabled(){
        return Boolean(this.interest.id);
      }
    },
    methods: {
      updateName () {
        this.$emit("edited", this.interest);
      },
      updateContact() {
        this.$emit("edited", this.interest);
      },
      updateComments() {
        this.$emit("edited", this.interest);
      }
    },
    mounted () {
      console.log('mounted with point of interest: ', this.interest);
    }
  }
</script>
