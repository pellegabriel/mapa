import './style.css';
import {Map, View} from 'ol';
import Stamen from 'ol/source/Stamen';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import {Icon, Style} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import { fromLonLat } from 'ol/proj';

function createStyle(src, img) {
  return new Style({
    image: new Icon({
      anchor: [0.5, 0.96],
      crossOrigin: 'anonymous',
      src: src,
      img: img,
      imgSize: img ? [img.width, img.height] : undefined,
    }),
  });
}

const iconFeature = new Feature(
  new Point([0, 0])
  );
iconFeature.set(
  'style', createStyle(
    'data/icon.png', undefined
    )
  );

const map = new Map({
  layers: [
    
    new TileLayer({
      source: new Stamen({
        layer: 'watercolor'
      })
    }),    
    new TileLayer({
      source: new Stamen({
        layer: 'terrain-labels',
      }),
    }),
    new VectorLayer({
      style: function(feature){
        return feature.get('style')
      },
      source: new VectorSource({
        features: [iconFeature]
      }),
    })
  ],
  target: document.getElementById('map'),
  view: new View({
    center: fromLonLat([-57.950069225014374, -34.914163405860094]),
    zoom: 14,
    minZoom: 9,
    maxZoom: 20,
  })
});
export default Map;