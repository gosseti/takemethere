import React from 'react'
import ReactDOM from 'react-dom'
import MapboxMap from './MapboxMap'
import _ from 'lodash'
import {getLayerforLocation, locationAsGeoJSON} from './MapUtils'

const MapMarker = React.createClass({

  render() {
    let args = {
      source: this.props.source,
      map: this.props.map,
      photo: this.props.photo
    }
    // let marker = this.generateMarker(args)
    return (
      <div></div>
      // <div>{this.addMarker(marker)}</div>
    )
  }

})

module.exports = MapMarker
