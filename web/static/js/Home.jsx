import styles from '../css/app.scss'
import {r, QueryRequest, PropsMixin as RethinkMixin} from 'react-rethinkdb'
import React from 'react'
import {default as update} from 'react-addons-update'
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps'
import MapboxMap from './components/MapboxMap'
import ReactDOM from 'react-dom'

export const Home = React.createClass({

  mixins: [RethinkMixin('rethinkSession')],

  observe(props, state) {
    const query = r.table('photos')
    return {
      photos: new QueryRequest({query, changes: true, initial: []}),
    }
  },

  componentDidMount: function(argument) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ29zc2V0IiwiYSI6ImZLdTcyTVkifQ.LGHJx-UvaAnNHuMUwDUXGw'
    const map = new mapboxgl.Map({
      container: ReactDOM.findDOMNode(this),
      style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
      center: [-74.50, 40], // starting position
      zoom: 9 // starting zoom
    })
    console.log(map)
  },

  makeMarker(photo) {
    return {
      position: {
        lat: photo.latitude,
        lng: photo.longitude
      },
      defaultAnimation: 2,
      key: photo.id
    }
  },

  render() {
    const errors = this.data.photos.errors()
    const photos = this.data.photos.value()

    return (
      <div className="container">
        <MapboxMap
          photos={photos}
          mapId="mapbox.comic"
          zoomControl={false}
          center={[59.907433, 30.299848]}
          zoom={17}
        />
      </div>
      // <GoogleMapLoader
      //   containerElement={
      //     <div className='map' {...this.props} />
      //   }
      //   googleMapElement={
      //     <GoogleMap
      //       ref={(map) => map}
      //       defaultZoom={3}
      //       defaultCenter={{lat: 0, lng: 5}}>
      //       {photos.map((photo, index) => {
      //         let marker = this.makeMarker(photo)
      //         console.log(marker)
      //         return (
      //           <Marker {...marker} />
      //         )
      //       })}
      //     </GoogleMap>
      //   }
      // />
    )
  }

})
