import { useState } from 'react'
import ReactMapGL, { Layer, Source } from 'react-map-gl';

const mapSources = {

  composite: {
    id: 'composite-source',
    type: 'vector',
    url: 'mapbox://mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2',
  },
  contour: {
    id: 'contour',
    type: 'vector',
    tiles: [
      `http://localhost:3001/v1/mvt/elev_contour/{z}/{x}/{y}?columns=contourelevation`,
    ],
  },
  usCounty: {
    id: 'us_county',
    type: 'vector',
    tiles: [
      `http://localhost:3001/v1/mvt/us_county/{z}/{x}/{y}?columns=namelsad`,
    ],
  },
  usState: {
    id: 'us_state',
    type: 'vector',
    tiles: [
      `http://localhost:3001/v1/mvt/us_state/{z}/{x}/{y}?columns=name,stusps`,
    ],
  },
};

const mapLayers = {
  county: {
    id: 'county',
    type: 'line',
    'source-layer': 'us_county',
    paint: {
      'line-color': 'green',
    },
  },
  countyLabels: {
    id: 'county_names',
    type: 'symbol',
    'source-layer': 'us_county',
    minzoom: 7,
    maxzoom: 9,
    layout: {
      'text-field': ['get', 'namelsad'],
      'text-size': 20,
      'text-allow-overlap': false,
    },
    paint: {
      'text-halo-color': '#333',
      'text-color': 'green',
      'text-halo-width': 1,
    },
  },
  contours: {
    id: 'contours',
    type: 'line',
    'source-layer': 'elev_contour',
    paint: {
      'line-color': 'red',
    },
  },
  contourLabels: {
    id: 'contour-label',
    type: 'symbol',
    'source-layer': 'elev_contour',
    layout: {
      'text-pitch-alignment': 'viewport',
      'symbol-placement': 'line',
      'text-max-angle': 25,
      'text-padding': 5,
      'text-field': [
        'concat',
        ['to-string', ['round', ['*', ['get', 'contourelevation'], 1]]],
        ' ft',
      ],
      'text-size': ['interpolate', ['linear'], ['zoom'], 15, 11, 20, 12],
    },
    paint: {
      'text-color': '#ffffff',
      'text-halo-color': 'hsl(35, 0%, 0%)',
      'text-halo-width': 1,
    },
  },
};

export default function WithLayers() {
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: 43.6256,
        longitude: -89.7716,
        zoom: 14
    });

    return (
        <>
            <div className="h-1000">
                <ReactMapGL
                    {...viewport}
                    onViewportChange={nextViewport => setViewport(nextViewport)}
                    height="100%"
                    width="100%"
                    mapboxApiAccessToken="pk.eyJ1Ijoia2t1cnR6IiwiYSI6ImNqdG9zYjJkbzAxMm4zeXJ2eWI5Z3h3cXUifQ.XurxBVHqKpwhvaCvdA6g4A"
                >
                <Source {...mapSources.contour}>
                  <Layer {...mapLayers.contours} minzoom={12} />
                  <Layer {...mapLayers.contourLabels} minzoom={12} />
                </Source>
                <Source {...mapSources.usCounty}>
                  <Layer {...mapLayers.county} />
                  <Layer {...mapLayers.countyLabels} />
                </Source>
                    </ReactMapGL>
            </div>
        </>
    )
}
