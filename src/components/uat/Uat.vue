<template>
<div style="background-color: grey">
  <UatHeader></UatHeader>
  <div class='row'>
    <div class='column map-column'>
        <div id="map" style="height: 100%; width: 100%;"></div>
    </div>
    <div class='column points-of-interest-column'>
      <div class='menu'>
        <h2>Puncte de interes</h2>
        <ul>
          <li> punct de interes 1</li>
          <li> punct de interes 2</li>
          <li> punct de interes 3</li>
        </ul>
      </div>
    </div>
  </div>

  <div></div>
</div>
</template>

<script>
import Map from 'ol/Map';
import View from 'ol/View.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Circle from 'ol/geom/Circle.js';
import {
  Tile as TileLayer,
  Vector as VectorLayer
} from 'ol/layer.js';
import {
  OSM
} from 'ol/source.js';

import UatHeader from './header/UatHeader';

export default {
  name: 'UAT',
  components: {
    UatHeader
  },
  computed: {

  },
  methods: {

  },
  mounted: function() {
    var map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
    console.log("UAT module mounted");
  }
}
</script>

<style src="./uat.css"></style>
