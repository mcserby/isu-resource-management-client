import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View.js';
import ImageLayer from 'ol/layer/Image';
import Projection from 'ol/proj/Projection';
import Static from 'ol/source/ImageStatic';
import {getCenter} from 'ol/extent';

const extent = [0, 0, 16557, 11693];
const projection = new Projection({
  code: 'cluj-image',
  units: 'pixels',
  extent: extent
});

export default {

  initMap: function() {
    const map = new Map({
      layers: [
        new ImageLayer({
          source: new Static({
            attributions: '© Isu Cluj',
            url: 'static/harta_50_percent.jpg',
            projection: projection,
            imageExtent: extent
          })
        })
      ],
      target: 'map',
      view: new View({
        projection: projection,
        center: getCenter(extent),
        zoom: 3
      })
    });
  }

}
