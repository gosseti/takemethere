import styles from '../css/app.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {r, QueryRequest, PropsMixin as RethinkMixin} from 'react-rethinkdb'
import MapboxMap from './components/MapboxMap'

export const Home = React.createClass({

  // import the rethinkDB session as a mixin
  mixins: [RethinkMixin('rethinkSession')],

  // observe the photos table and return any new ones that come in
  observe(props, state) {
    const query = r.table('photos')
    return {
      photos: new QueryRequest({query, changes: true, initial: []}),
    }
  },

  render() {
    // set up variables for both the photos and errors
    const errors = this.data.photos.errors()
    const photos = this.data.photos.value()
    return (
      <div className='container'>
        {/* send the photos as props to the map component and render it
            an example of the photos data can be found in data.json */}
        <MapboxMap
          errors={errors}
          photos={photos}
        />
      </div>
    )
  }

})
