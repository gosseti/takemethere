import styles from '../css/app.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {r, QueryRequest, PropsMixin as RethinkMixin} from 'react-rethinkdb'
import MapboxMap from './components/MapboxMap'

export const Home = React.createClass({

  mixins: [RethinkMixin('rethinkSession')],

  observe(props, state) {
    const query = r.table('photos')
    return {
      photos: new QueryRequest({query, changes: true, initial: []}),
    }
  },

  render() {
    const errors = this.data.photos.errors()
    const photos = this.data.photos.value()
    return (
      <div className='container'>
        <MapboxMap
          errors={errors}
          photos={photos}
        />
      </div>
    )
  }

})
