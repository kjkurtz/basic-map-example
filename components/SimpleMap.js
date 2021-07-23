import React, { useState } from 'react'
import ReactMapGL from 'react-map-gl';

const SimpleMap = () => {
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    });

    return (
        <ReactMapGL
            {...viewport}
            onViewportChange={nextViewport => setViewport(nextViewport)}
            height="100%"
            width="100%"
            mapboxApiAccessToken="pk.eyJ1Ijoia2t1cnR6IiwiYSI6ImNqdG9zYjJkbzAxMm4zeXJ2eWI5Z3h3cXUifQ.XurxBVHqKpwhvaCvdA6g4A"
        />
    )
}

export default SimpleMap
