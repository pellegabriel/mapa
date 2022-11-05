import "./style.css";
import { Map, Tile, View } from "ol";
import Stamen from "ol/source/Stamen";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { fromLonLat } from "ol/proj";
import Overlay from "ol/Overlay";

const gasStations = [
  {name: "la YPF", lon: -57.915626844862324, lat: -34.91510065692611},
  {name: "la YPF", lon: -57.94647056660717, lat: -34.92041928644089},
  {name: "la YPF", lon: -57.96823692286914, lat: -34.89954399776112},
  {name: "la YPF", lon: -57.95100007881291, lat: -34.91513994316877},
  {name: "la YPF", lon: -57.93533877016539, lat: -34.93488378522299},
  {name: "la YPF", lon: -57.926944254794634, lat: -34.906359966059185},
  {name: "la YPF", lon: -57.95485193032597, lat: -34.88635172721391} 
];

const iconStyle = new Style ({
  image: new Icon({
    anchor: [0.5, 0.5],
    anchorXUnits: "fraction",
    anchorYUnits: "fraction",
    src: "./sprite/barril.png",
    scale: 0.1
  }),
});


const iconFeatures = gasStations.map(({name, lon, lat}) => {

  const iconFeature = new Feature({
    name: ({name}),
    geometry: new Point(fromLonLat([lon, lat]))
  });
  
  iconFeature.setStyle(iconStyle);

  return iconFeature
})


const vectorSource = new VectorSource({
  features: iconFeatures,
});

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

const element = document.getElementById('popup');
console.log('element', )
const popup= new Overlay ({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false,
});
map.addOverlay(popup);

map.on('click',function (evt) {
  const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature){
    return feature;
  });
  if (feature){
    var element2 = document.createElement('div')
    element2.innerHTML=`<h2 class="gasStationName">${feature['values_'].name.name}</h2>`
    popup.setElement(element2)
    popup.setPosition(evt.coordinate)
  }
});

// change mouse cursor when over marker
map.on('pointermove', function (e) {
  const pixel = map.getEventPixel(e.originalEvent);
  const hit = map.hasFeatureAtPixel(pixel);
  map.getTarget().style.cursor = hit ? 'pointer' : '';
});
