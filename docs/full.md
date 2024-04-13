---
toc: false
---

<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 4rem 0 8rem;
  text-wrap: balance;
  text-align: center;
}

.hero h1 {
  margin: 2rem 0;
  max-width: none;
  font-size: 14vw;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(30deg, var(--theme-foreground-focus), currentColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero h2 {
  margin: 0;
  max-width: 34em;
  font-size: 20px;
  font-style: initial;
  font-weight: 500;
  line-height: 1.5;
  color: var(--theme-foreground-muted);
}

@media (min-width: 640px) {
  .hero h1 {
    font-size: 90px;
  }
}

</style>

<div class="hero">
  <h1>New York Real Estate</h1>
  <h2>Welcome to interactive visualizations of New York City real estate data!
</div>


```js
const center = [40.7,-74];
const zoom = 9.5;
```

```js
const areas = FileAttachment("data/new_york_real_estate_MapPLUTO_data_ndjson_min_zoom_0_max_zoom_11_notilesizelimit.pmtiles");
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
  map.addSource("dataMapPLUTO24v1_wgs84", {
      type: "vector",
      url: `pmtiles://${areas.href}`
  })

  map.addLayer({
    "id":"dataMapPLUTO24v1_wgs84",
    "source": "dataMapPLUTO24v1_wgs84",
    "source-layer":"dataMapPLUTO24v1_wgs84",
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
    "id":"dataMapPLUTO24v1_wgs84_stroke",
    "source": "dataMapPLUTO24v1_wgs84",
    "source-layer":"dataMapPLUTO24v1_wgs84",
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

  map.on('mousemove', 'dataMapPLUTO24v1_wgs84', (e) => {

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
                  {source: 'dataMapPLUTO24v1_wgs84', sourceLayer: "dataMapPLUTO24v1_wgs84", id: hoveredId},
                  {hover: false}
              );
          }
          hoveredId = e.features[0].id;
          map.setFeatureState(
              {source: 'dataMapPLUTO24v1_wgs84', sourceLayer: "dataMapPLUTO24v1_wgs84", id: hoveredId},
              {hover: true}
          );
      }
  });

  map.on('mouseleave', 'dataMapPLUTO24v1_wgs84', () => {
      map.getCanvas().style.cursor = '';
      popup.remove();

      if (hoveredId) {
          map.setFeatureState(
              {source: 'dataMapPLUTO24v1_wgs84', sourceLayer: "dataMapPLUTO24v1_wgs84", id: hoveredId},
              {hover: false}
          );
      }
      hoveredId = null;
  });
})
```
