import React from 'react'
import ReactDOM from 'react-dom'
import MapboxMap from './MapboxMap'
import _ from 'lodash'
import {getLayerforLocation, locationAsGeoJSON} from './utils'

const MapMarker = React.createClass({

  generateMarker(args) {
    // create a new geojson object for our map marker
    this.locationJSONsource = new mapboxgl.GeoJSONSource({
      data: locationAsGeoJSON(args.photo)
    })
    // console.log(this.locationJSONsource)
    // add the geojson marker to our map
    args.map.addSource(args.photo.id, this.locationJSONsource)
    // add the layer for the geojson markers to display on
    args.map.addLayer(getLayerforLocation(args.photo.id))
  },

  render() {
    let args = {
      map: this.props.map,
      photo: this.props.photo
    }
    let marker = this.generateMarker(args)
    return (
      <div></div>
      // <div>{this.addMarker(marker)}</div>
    )
  }

})

module.exports = MapMarker
