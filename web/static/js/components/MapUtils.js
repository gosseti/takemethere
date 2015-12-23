export const generateMarker = function(args) {
  return new mapboxgl.GeoJSONSource({
    data: locationAsGeoJSON(args)
  })
}

export const locationAsGeoJSON = function(args) {
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [args.longitude, args.latitude]
    },
    properties: {
      title: args.name,
      "marker-symbol": "harbor"
    }
  }
}

export const getLayerforLocation = function(args) {
  return {
    "id": "markers",
    "type": "symbol",
    "source": "markers",
    "layout": {
      "text-field": "{title}",
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      "text-offset": [0, 0.6],
      "text-anchor": "top"
    },
    "paint": {
      "text-size": 12
    }
  }
}
