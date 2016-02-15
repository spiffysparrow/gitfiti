var React = require('react');
var ReactDOM = require('react-dom');
var FilterActions = require('../actions/filter_actions');

function _getCoordsObj(latLng) {
  return {
    lat: latLng.lat(),
    lng: latLng.lng()
  };
}

var CENTER = {lat: 37.7758, lng: -122.435};

var Map = React.createClass({
  componentDidMount: function(){
    console.log('map mounted');
    var map = ReactDOM.findDOMNode(this.refs.map);
    var mapOptions = {
      center: this.centerBenchCoords(),
      zoom: 13
    };
    this.map = new google.maps.Map(map, mapOptions);
    this.registerListeners();
    this.markers = [];
    this.props.benches.forEach(this.createMarkerFromBench);
  },
  centerBenchCoords: function () {
    if (this.props.benches[0] && this.props.benches[0].lng) {
      var bench = this.props.benches[0];
      return { lat: bench.lat, lng: bench.lng };
    } else {
      return CENTER;
    }
  },
  componentDidUpdate: function (oldProps) {
    this._onChange(); 
  },
  _onChange: function(){
    var benches = this.props.benches;
    var toAdd = [], toRemove = this.markers.slice(0);
    benches.forEach(function(bench, idx){
      var idx = -1;
      //check if bench is already on map as a marker
      for(var i = 0; i < toRemove.length; i++){
        if(toRemove[i].benchId == bench.id){
          idx = i;
          break;
        }
      }
      if(idx === -1){
        //if it's not already on the map, we need to add a marker
        toAdd.push(bench);
      } else {
        //if it IS already on the map AND in the store, we don't need
        //to remove it
        toRemove.splice(idx, 1);
      }
    });
    toAdd.forEach(this.createMarkerFromBench);
    toRemove.forEach(this.removeMarker);

    if (this.props.singleBench) {
      this.map.setOptions({draggable: false});
      this.map.setCenter(this.centerBenchCoords());
    }
  },
  componentWillUnmount: function(){
    console.log("map UNmounted");
  },
  registerListeners: function(){
    var that = this;
    google.maps.event.addListener(this.map, 'idle', function() {
      var bounds = that.map.getBounds();
      var northEast = _getCoordsObj(bounds.getNorthEast());
      var southWest = _getCoordsObj(bounds.getSouthWest());
      //actually issue the request
      var bounds = {
        northEast: northEast,
        southWest: southWest
      };
      FilterActions.updateBounds(bounds);
    });
    google.maps.event.addListener(this.map, 'click', function(event) {
      var coords = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      that.props.onMapClick(coords);
    });
  },
  createMarkerFromBench: function (bench) {
    var that = this;
    var pos = new google.maps.LatLng(bench.lat, bench.lng);
    var marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      benchId: bench.id
    });
    marker.addListener('click', function () {
      that.props.onMarkerClick(bench)
    });
    this.markers.push(marker);
  },
  removeMarker: function(marker){
    for(var i = 0; i < this.markers.length; i++){
      if (this.markers[i].benchId === marker.benchId){
        this.markers[i].setMap(null);
        this.markers.splice(i, 1);
        break;
      }
    }
  },
  render: function(){
    return ( <div className="half" ref="map">Map</div>);
  }
});

module.exports = Map;
