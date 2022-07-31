import './style.css';
import {Map, Tile, View} from 'ol';
// import OSM from 'ol/source/OSM'
import Stamen from 'ol/source/Stamen';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import {Icon, Style} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import { fromLonLat } from 'ol/proj';



const iconFeature = new Feature({
  geometry: new Point(
    fromLonLat([-57.950069225014374, -34.914163405860094])
    ),
    name:'Barril',
    population: 4000,
    rainfall: 500
});
const iconStyle = new Style({
  image: new Icon({
      anchor: [0.5, 0.96],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: './barril.png'
    }),
  });

iconFeature.setStyle(iconStyle);

const vectorSource = new VectorSource({
  features: [iconFeature]
});
//nose si tiene que ser new Vector ({})
const vectorLayer = new VectorLayer({
  source: vectorSource
});


const map = new Map({
  layers: [
    // new Tile({
    //   source:new OSM()
    // }),    
    new TileLayer({
      source: new Stamen({
        layer: 'toner'
      }),
    }),
    new VectorLayer({
      style: function(feature){
        return feature.get('style')
      },
      source: new VectorSource({
        features: [iconFeature]
      }),
    }),
    vectorLayer
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