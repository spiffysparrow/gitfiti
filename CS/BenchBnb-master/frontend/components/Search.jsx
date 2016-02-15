var React = require('react');
var BenchStore = require('../stores/bench');
var FilterParamsStore = require('../stores/filter_params');
var ApiUtil = require('../util/api_util');
var Filters = require('./Filters');
var Index = require('./Index');
var Map = require('./Map');

function _getAllBenches() {
  return BenchStore.all();
}

function _getFilterParams() {
  return FilterParamsStore.params();
}
var Search = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  _benchesChanged: function(){
    this.setState({benches: _getAllBenches()});
  },
  _filtersChanged: function () {
    var newParams = _getFilterParams();
    this.setState({ filterParams: newParams });
    ApiUtil.fetchBenches();
  },
  getInitialState: function(){
    return {
      benches: _getAllBenches(),
      filterParams: _getFilterParams(),
      clickedLoc: null,
    };
  },
  componentDidMount: function(){
    this.benchListener = BenchStore.addListener(this._benchesChanged);
    this.filterListener = FilterParamsStore.addListener(this._filtersChanged);
    ApiUtil.fetchBenches();
  },
  componentWillUnmount: function(){
    this.benchListener.remove();
    this.filterListener.remove();
  },
  handleMapClick: function(coords){
    this.props.history.pushState(null, "benches/new", coords);
  },
  handleMarkerClick: function (bench) {
    this.props.history.pushState(null, "benches/" + bench.id);
  },
  render: function(){
    return(
      <div>
        <h5>Click Map to Add Bench!</h5>
        <Map 
          onMapClick={this.handleMapClick} 
          onMarkerClick={this.handleMarkerClick} 
          benches={this.state.benches}/>
        <div className="half">
          <Filters benches={this.state.benches} filterParams={this.state.filterParams}/>
          <Index benches={this.state.benches} history={this.props.history} />
        </div>
      </div>
    );
  }
});

module.exports = Search
