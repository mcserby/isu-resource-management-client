import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View.js';
import ImageLayer from 'ol/layer/Image';
import Projection from 'ol/proj/Projection';
import Static from 'ol/source/ImageStatic';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

import {
  getCenter
} from 'ol/extent';
import {
  Tile as TileLayer,
  Vector as VectorLayer
} from 'ol/layer';
import {
  OSM,
  Vector as VectorSource
} from 'ol/source';
import {
  Fill,
  Stroke,
  Style,
  Icon,
  Text,
  RegularShape
} from 'ol/style';

const extent = [0, 0, 8279, 5847];
const projection = new Projection({
  code: 'cluj-image',
  units: 'pixels',
  extent: extent
});

let map = null;

var locationsLayerSource = new VectorSource({});

//vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));

var image = new Icon({
  src: 'static/blacklocation.png',
  scale: 0.05,
});

function iconStyleFunction(feature) {
  return new Style({
      image: image,
      text: new Text({
        font: 'bold 16px sans-serif',
        offsetY: 35,
        text: feature.getProperties().name
      })
    });
}

const vectorLayer = new VectorLayer({
  source: locationsLayerSource,
  style: iconStyleFunction
});

vectorLayer.setZIndex(1);

const backgroundImageLayer = new ImageLayer({
  source: new Static({
    attributions: '© Isu Cluj',
    url: 'static/harta_50_percent.jpg',
    projection: projection,
    imageExtent: extent
  })
});

backgroundImageLayer.setZIndex(-1);

export default {

  initMap: function() {
    map = new Map({
      layers: [
        backgroundImageLayer,
        vectorLayer,
      ],
      target: 'map',
      view: new View({
        projection: projection,
        center: getCenter(extent),
        zoom: 3
      })
    });
  },

  addLocation: function(location) {
    const locationFeature = new Feature({
      id: location.id,
      geometry: new Point(location.coordinates),
      name: location.name
    });
    locationFeature.setId(location.id);
    locationsLayerSource.addFeature(locationFeature);
  },
  deleteLocation: function(location) {
    console.log(locationsLayerSource.getFeatures());
    const featuresToRemove = locationsLayerSource.getFeatures().filter(f => f.getId() === location.id);
    console.log("featuresToRemove: ", featuresToRemove);
    featuresToRemove.forEach(f => locationsLayerSource.removeFeature(f));
  },
  setMapClickHandler: function(mapClickHandler){
    map.on('click', mapClickHandler);
  },
  unsetMapClickHandler: function(mapClickHandler){
    map.un('click', mapClickHandler);
  },
  zoomToLocation: function(location) {
    map.getView().animate({zoom: 3}, {center: location.coordinates});
  },

}
