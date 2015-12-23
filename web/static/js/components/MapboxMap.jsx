import React from 'react'
import ReactDOM from 'react-dom'
import MapMarker from './MapMarker'
import _ from 'lodash'

const MapboxMap = React.createClass({

  getInitialState() {
    return this.state = {
      map: {}
    }
  },

  componentWillReceiveProps(nextProps){
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ29zc2V0IiwiYSI6ImZLdTcyTVkifQ.LGHJx-UvaAnNHuMUwDUXGw'
    let map = new mapboxgl.Map({
      container: ReactDOM.findDOMNode(this),
      style: 'mapbox://styles/mapbox/dark-v8',
      center: [0, 0],
      zoom: 1
    })
    const mapLoaded = new Promise((resolve) => {
      return map.on('load', resolve)
    })
    return mapLoaded.then(() => {
      console.log('map loaded')
      this.setState({ map: map })
    })
  },

  render() {
    let errors = this.props.errors
    let photos = this.props.photos
    let map = this.state.map
    return (
      <div className='map'>
        {errors.length > 0 && errors.map((error, index) => (
          <pre key={index}>Error: {error}</pre>
        ))}
        {errors.length === 0 && !_.isEmpty(map) && photos.map(photo => (
          // console.log(photo)
          <MapMarker key={photo.id} photo={photo} map={map} />
        ))}
      </div>
    )
  }

})

module.exports = MapboxMap
