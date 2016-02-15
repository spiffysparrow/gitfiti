var React = require('react');
var ApiUtil = require('../util/api_util');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var BenchForm = React.createClass({
  mixins: [LinkedStateMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function(){
    return {
      description: "",
      seating: 2
    };
  },
  handleSubmit: function(event){
    event.preventDefault();
    var bench = Object.assign({}, this.state, this._coords());
    ApiUtil.createBench(bench);
    this.navigateToSearch();
  },
  navigateToSearch: function(){ 
    this.props.history.pushState(null, "/");
  },
  handleCancel: function(event){
    event.preventDefault();
    this.navigateToSearch();
  },
  _coords: function(){
    return this.props.location.query;
  },
  render: function(){
    var lat = this._coords().lat, lng = this._coords().lng;
    return (
        <div>
          <h3>Create A Bench!</h3>
          <form onSubmit={this.handleSubmit}>
            <label>Description</label>
            <input type="text" valueLink={this.linkState('description')}/>
            <br/>
            <label>Number of Seats</label>
            <input min='0' type="number" valueLink={this.linkState('seating')}/>
            <br/>
            <label>Latitude</label>
            <input type="text" disabled="true" value={lat}/>
            <br/>
            <label>Longitude</label>
            <input type="text" disabled="true" value={lng}/>
            <br/>
            <input type="submit" value="create bench"/>
          </form>
          <button onClick={this.handleCancel}>Cancel</button>
        </div>
    );
  }
});

module.exports = BenchForm;
