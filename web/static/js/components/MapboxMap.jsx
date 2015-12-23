import React from 'react'
import ReactDOM from 'react-dom'
import MapMarker from './MapMarker'
import _ from 'lodash'

import {generateMarker, locationAsGeoJSON, getLayerforLocation} from './MapUtils'

const MapboxMap = React.createClass({

  // get initial state and set the map object inside of it
  getInitialState() {
    return this.state = {
      map: {}
    }
  },

  // initialise the Mapbox map
  // http://stackoverflow.com/questions/34337330/access-object-from-multiple-react-components
  componentWillReceiveProps() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ29zc2V0IiwiYSI6ImZLdTcyTVkifQ.LGHJx-UvaAnNHuMUwDUXGw'
    let map = new mapboxgl.Map({
      // render the map to the DOMNode inside of the render() method
      container: ReactDOM.findDOMNode(this),
      style: 'mapbox://styles/mapbox/basic-v8',
      center: [-77.03238901390978, 38.913188059745586],
      zoom: 1
    })
    // set up a promise for when the map loads
    const mapLoaded = new Promise((resolve) => {
      return map.on('load', resolve)
    })
    // when the map loads, set the map object inside the state
    return mapLoaded.then(() => {
      let source = generateMarker(this.props.photos[1])
      map.addSource('markers', source)
      map.addLayer(getLayerforLocation())
      this.setState({ map: map })
      this.renderMarkers(this.props.photos, source)
    })
  },

  renderMarkers(photos, source) {
    let map = this.state.map
    photos.map(photo => {
      let data = generateMarker(photo)
      map.addSource('markers', data)
    })
    // <MapMarker key={photo.id} photo={photo} map={map} />
  },

  render() {
    return (
      <div className='map'></div>
    )
  }

})

module.exports = MapboxMap
