/* This example requires Tailwind CSS v2.0+ */
import { useState } from 'react'
import ReactMapGL, { Layer, Source } from 'react-map-gl';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const geojson = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', geometry: { type: 'Point', coordinates: [-89.7716, 43.6256] } }
  ]
};

const layerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
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
    <div className="h-1000">
      <ReactMapGL
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        height="100%"
        width="100%"
        mapboxApiAccessToken="pk.eyJ1Ijoia2t1cnR6IiwiYSI6ImNqdG9zYjJkbzAxMm4zeXJ2eWI5Z3h3cXUifQ.XurxBVHqKpwhvaCvdA6g4A"
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </ReactMapGL>
    </div>
  )
}
