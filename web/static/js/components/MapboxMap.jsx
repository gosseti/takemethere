import React from 'react'
import ReactDOM from 'react-dom'
// Assuming Mapbox/Leaflet is already exposed as `L`

var MapboxMap = React.createClass({
  componentDidMount: function(argument) {
    var props = this.props;

    var mapId = props.mapId || props.src || "mapbox.streets";

    var options = {};
    var ownProps = ['mapId', 'onMapCreated'];
    for (var k in props) {
      if (props.hasOwnProperty(k) && ownProps.indexOf(k) === -1) {
        options[k] = props[k];
      }
    }

    mapboxgl.accessToken = 'pk.eyJ1IjoiZ29zc2V0IiwiYSI6ImZLdTcyTVkifQ.LGHJx-UvaAnNHuMUwDUXGw'
    const map = new mapboxgl.Map({
      container: ReactDOM.findDOMNode(this),
      style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
      center: [-74.50, 40], // starting position
      zoom: 9 // starting zoom
    })

    console.log(map)

    if (this.props.onMapCreated) {
      this.props.onMapCreated(map, L);
    }
  },

  render: function() {
    return (
      <div className='map'>

      </div>
    );
  }
});

module.exports = MapboxMap;
