import React from 'react'
import ReactDOM from 'react-dom'
import MapboxMap from './MapboxMap'
import _ from 'lodash'
import {getLayerforLocation, locationAsGeoJSON} from './utils'

const MapMarker = React.createClass({

  generateMarker(args) {
    this.locationJSONsource = new mapboxgl.GeoJSONSource({
      data: locationAsGeoJSON(args.photo)
    })
    console.log(this.locationJSONsource)
    // args.map.addSource(args.photo.id, this.locationJSONsource)
    // args.map.addLayer(getLayerforLocation(args.photo.id))
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
