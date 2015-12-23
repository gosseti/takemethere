export const getLayerforLocation = function(args) {
  return {
    id: 'location',
    type: 'symbol',
    source: 'location',
    layout: {
      "icon-allow-overlap": true,
      "icon-ignore-placement": true,
      "icon-image": "location"
    }
  }
}

export const locationAsGeoJSON = function(args) {
  return {
    type: "FeatureCollection",
    features: [{
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [args.longitude, args.latitude]
      }
    }]
  }
}
