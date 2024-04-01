---
title: Example map
---

# Interaction: MapLibre GL JS

[Observable Framework](https://observablehq.com/framework/) is an open source static site generator for data apps.

[MapLibre GL JS](https://maplibre.org) is more advanced than leaflet. Use it if you require:

* Transparent overlay layers
* Smooth, continuous zoom
* Feature interaction with popups and hover states

```js
const center = [38,-100];
const zoom = 4;
```

```js
const areas = FileAttachment("data/cb_2018_us_zcta510_500k_nolimit.pmtiles");
```

```js
import maplibregl from "npm:maplibre-gl@4.0.2";
import { PMTiles, Protocol } from "npm:pmtiles@3.0.3";
const protocol = new Protocol();
maplibregl.addProtocol("pmtiles",protocol.tile);
```

<link rel="stylesheet" type="text/css" href="https://unpkg.com/maplibre-gl@4.0.2/dist/maplibre-gl.css">

```js
const div = display(document.createElement("div"));
div.style = "height: 400px;";
const map = new maplibregl.Map({
  container: div,
  zoom: zoom - 1,
  center: [center[1],center[0]],
  style: "https://api.protomaps.com/styles/v2/black.json?key=7c0c24912bd59a0f"
})

map.on("load", () => {
  map.addSource("zcta", {
      type: "vector",
      url: `pmtiles://${areas.href}`
  })

  map.addLayer({
    "id":"zcta",
    "source": "zcta",
    "source-layer":"zcta",
    "type": "fill",
    "paint": {
        "fill-color": [
          "case",
          ['boolean', ['feature-state', 'hover'], false],
          "red",
          "steelblue"
        ],
        "fill-opacity": 0.7
    }
  })

  map.addLayer({
    "id":"zcta_stroke",
    "source": "zcta",
    "source-layer":"zcta",
    "type": "line",
    "paint": {
        "line-color": "cyan",
        "line-width": 0.2
    }
  })

  let hoveredId = null;

  const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false
  });

  map.on('mousemove', 'zcta', (e) => {

      if (e.features.length > 0) {
          map.getCanvas().style.cursor = 'pointer';
          const props = e.features[0].properties;
          let result = '';
          for (let key in props) {
            if (props.hasOwnProperty(key)) {
              result += key + ': ' + props[key] + '<br/>';
            }
          }
          popup.setLngLat(e.lngLat).setHTML(result).addTo(map);

          if (hoveredId) {
              map.setFeatureState(
                  {source: 'zcta', sourceLayer: "zcta", id: hoveredId},
                  {hover: false}
              );
          }
          hoveredId = e.features[0].id;
          map.setFeatureState(
              {source: 'zcta', sourceLayer: "zcta", id: hoveredId},
              {hover: true}
          );
      }
  });

  map.on('mouseleave', 'zcta', () => {
      map.getCanvas().style.cursor = '';
      popup.remove();

      if (hoveredId) {
          map.setFeatureState(
              {source: 'zcta', sourceLayer: "zcta", id: hoveredId},
              {hover: false}
          );
      }
      hoveredId = null;
  });
})
```
