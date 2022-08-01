import "./style.css";
import { Map, Tile, View } from "ol";
// import OSM from 'ol/source/OSM'
import Stamen from "ol/source/Stamen";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { fromLonLat } from "ol/proj";

const gasStations = [
  {name: "la YPF", lon: -57.915626844862324, lat: -34.91510065692611},
  {name: "la YPF", lon: -57.94647056660717, lat: -34.92041928644089},
  {name: "la YPF", lon: -57.96823692286914, lat: -34.89954399776112},
  {name: "la YPF", lon: -57.95100007881291, lat: -34.91513994316877},
  {name: "la YPF", lon: -57.93533877016539, lat: -34.93488378522299},
  {name: "la YPF", lon: -57.926944254794634, lat: -34.906359966059185},
  {name: "la YPF", lon: -57.95485193032597, lat: -34.88635172721391} 
];

const iconStyle = new Style({
  image: new Icon({
    anchor: [0.5, 0.5],
    anchorXUnits: "fraction",
    anchorYUnits: "fraction",
    src: "./barril.png",
    scale: 0.1
  }),
});


const iconFeatures = gasStations.map(({name, lon, lat}) => {

  const iconFeature = new Feature({
    name: ({name}),
    geometry: new Point(fromLonLat([lon, lat])),
    name
  });
  
  iconFeature.setStyle(iconStyle);

  return iconFeature
})


const vectorSource = new VectorSource({
  features: iconFeatures,
});
//nose si tiene que ser new Vector ({})
const vectorLayer = new VectorLayer({
  source: vectorSource,
});

const map = new Map({
  layers: [
    // new Tile({
    //   source:new OSM()
    // }),
    new TileLayer({
      source: new Stamen({
        layer: "toner",
      }),
    }),
    new VectorLayer({
      style: function (feature) {
        return feature.get("style");
      }
    }),
    vectorLayer,
  ],
  target: document.getElementById("map"),
  view: new View({
    center: fromLonLat([-57.950069225014374, -34.914163405860094]),
    zoom: 14,
    minZoom: 12,
    maxZoom: 20,
  }),
});
export default Map;
