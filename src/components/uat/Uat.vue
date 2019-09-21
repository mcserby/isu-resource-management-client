<template>
<div style="background-color: red">
  <h1>UAT</h1>
  <div id="map"></div>
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


export default {
  name: 'UAT',

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
