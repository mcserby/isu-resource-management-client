<template>
  <div class="location-dialog-container" style="display: block">
    <div class="dialog modal" role="dialog" style="display: block">
      <div class="modal-dialog modal-dialog-centered editor-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5><input
              type="text"
              minlength="3"
              required
              v-model="location.name"
              @input="updateLocationName()"
              class="form-control"
              id="point-of-interest-name"
              aria-describedby="nameHelp"
              placeholder="Nume punct de interes"
            ></h5>
            <button type="button" class="btn custom-close-button" @click="cancel()">X</button>
          </div>
          <div class="modal-body body-wrapper">
            <div class="unit-of-interest-browser-list">
              <div
                v-for="(pointOfInterest) in location.pointsOfInterest"
                v-bind:class="['unit-of-interest-browser-summary', rowColor(pointOfInterest)]"
                v-bind:key="pointOfInterest.id"
              >
                <span @click="onPointOfInterestClick(pointOfInterest)">
                  {{pointOfInterest.name}}
                </span>
                <span class="delete-point-of-interest">
                  <button
                    type="button"
                    class="btn custom-close-button"
                    @click="deletePointOfInterest(pointOfInterest)"
                  >X
                  </button>
                </span>
              </div>
              <div class="unit-of-interest-summary">
                <div class="add-unit-of-interest-button-wrapper">
                  <button
                    type="button"
                    class="custom-button btn"
                    @click="addNewPointOfInterest()"
                    :disabled="addNewPointOfInterestDisabled()"
                  >Adaugă obiectiv
                  </button>
                </div>u
              </div>
            </div>
            <PointOfInterestEditor :interest="currentPointOfInterest" @edited="onPointOfInterestEdited"></PointOfInterestEditor>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="custom-button btn"
              @click="saveAndClose"
              :disabled="saveDisabled"
            >Salvează și închide
            </button>
            <button type="button" class="custom-button btn" @click="cancel">Anulează și închide</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Utils from '../../../services/utils';
  import PointOfInterestEditor from './PointOfInterestEditor';
  import PointOfInterest from '../../../contracts/uat/pointOfInterest';

  export default {
    name: 'ExtendedLocationEditor',
    components: {
      PointOfInterestEditor
    },
    props: ['location'],
    data: () => {
      return {
        errors: [],
        changesPerformed: false,
        currentPointOfInterest: new PointOfInterest(null, '', '', ''),
      }
    },
    computed: {
      saveDisabled () {
        return !this.changesPerformed
      },
      title () {
        return this.location.name
      }
    },
    methods: {
      onPointOfInterestEdited (point) {
        this.changesPerformed = true;
        console.log('edited:', point);
        const pointOfInterestId = this.location.pointsOfInterest.findIndex(p => p.id === point.id);
        if(pointOfInterestId !== -1) {
          this.location.pointsOfInterest.splice(pointOfInterestId, 1, point);
        } else {
          this.location.pointsOfInterest.push(point);
        }
      },
      addNewPointOfInterestDisabled () {
        return false;
      },
      saveAndClose () {
        this.$emit('saveLocation', this.location);
        this.closeAddPointOfInterestDialog();
      },
      cancel () {
        this.closeAddPointOfInterestDialog();
      },
      addNewPointOfInterest () {
        this.currentPointOfInterest = new PointOfInterest(Utils.createUUID(), '', '', '');
        this.location.pointsOfInterest.push(JSON.parse(JSON.stringify(this.currentPointOfInterest)));
        this.changesPerformed = true;
      },
      clearFormValues () {
        this.errors = [];
      },
      updateLocationName() {
        this.changesPerformed = true;
        console.log('location name:', this.location.name);
      },
      closeAddPointOfInterestDialog () {
        this.$emit('cancelEditLocation');
      },
      onPointOfInterestClick (pointOfInterest) {
        this.currentPointOfInterest = pointOfInterest;
        this.selectedPointOfInterestId = this.currentPointOfInterest.id;
      },
      rowColor (pointOfInterest) {
        if (pointOfInterest.id === this.selectedPointOfInterestId) {
          return 'even';
        }
        return 'odd';
      },
      deletePointOfInterest (pointOfInterest) {
        this.location.pointsOfInterest = this.location.pointsOfInterest.filter(p => p.id !== pointOfInterest.id)
        this.errors = []
        this.justMounted = false
        this.changesPerformed = true
        if (this.selectedPointOfInterestId === pointOfInterest.id) {
          this.selectedPointOfInterestId = this.location.pointsOfInterest[0].id
        }
      }
    },
    beforeMount() {
      if (this.location.pointsOfInterest.length > 0) {
        this.currentPointOfInterest = this.location.pointsOfInterest[0];
      }
    }
  }
</script>
<style src="./locationEditor.css"></style>
