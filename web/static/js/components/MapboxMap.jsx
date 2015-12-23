import React from 'react'
import ReactDOM from 'react-dom'
import MapMarker from './MapMarker'
import _ from 'lodash'

const MapboxMap = React.createClass({

  // get initial state and set the map object inside of it
  getInitialState() {
    return this.state = {
      map: {}
    }
  },

  // initialise the Mapbox map
  // http://stackoverflow.com/questions/34337330/access-object-from-multiple-react-components
  componentWillReceiveProps(nextProps){
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ29zc2V0IiwiYSI6ImZLdTcyTVkifQ.LGHJx-UvaAnNHuMUwDUXGw'
    let map = new mapboxgl.Map({
      // render the map to the DOMNode inside of the render() method
      container: ReactDOM.findDOMNode(this),
      style: 'mapbox://styles/mapbox/dark-v8',
      center: [0, 0],
      zoom: 1
    })
    // set up a promise for when the map loads
    const mapLoaded = new Promise((resolve) => {
      return map.on('load', resolve)
    })
    // when the map loads, set the map object inside the state
    return mapLoaded.then(() => {
      // console.log('map loaded')
      this.setState({ map: map })
    })
  },

  render() {
    let errors = this.props.errors
    let photos = this.props.photos
    let map = this.state.map
    return (
      <div className='map'>
        {/* when we have errors, display them */}
        {errors.length > 0 && errors.map((error, index) => (
          <pre key={index}>Error: {error}</pre>
        ))}
        {/* when we have no errors, a map object and photos, we render the markers */}
        {errors.length === 0 && !_.isEmpty(map) && photos.map(photo => (
          <MapMarker key={photo.id} photo={photo} map={map} />
        ))}
      </div>
    )
  }

})

module.exports = MapboxMap
