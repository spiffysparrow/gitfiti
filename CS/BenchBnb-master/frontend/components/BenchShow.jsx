var React = require('react');
var BenchStore = require('../stores/bench');
var ReactRouter = require('react-router');
var Bench = require('./Bench');
var Map = require('./Map');
var ApiUtil = require('../util/api_util');

var BenchShow = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function () {
    var benchId = this.props.params.benchId;
    var bench = this._findBenchById(benchId) || {} ;
    return { bench: bench }; 
  },
  _findBenchById: function (id) {
    var res;
     BenchStore.all().forEach(function (bench) {
      if (id == bench.id) {
        res = bench; 
      }
    }.bind(this));
     return res;
  },
  componentDidMount: function () {
    this.benchListener = BenchStore.addListener(this._benchChanged);
    ApiUtil.fetchBenches();
  },
  componentWillUnmount: function () {
    this.benchListener.remove();
  },
  _benchChanged: function () {
    var benchId = this.props.params.benchId;
    var bench = this._findBenchById(benchId);
    this.setState({ bench: bench });
  },
  render: function () {
    var benches = [];
    if (this.state.bench) {
      benches.push(this.state.bench);
    }
    var Link = ReactRouter.Link;
    var reviewURL = "/benches/" + this.state.bench.id + "/review";

    return (
        <div>
          <Link to="/" >Back to Benches Index</Link>
          <Map className="half"
            singleBench={true}
            benches={benches}
            onMapClick={this.handleMapClick} 
            onMarkerClick={this.handleMarkerClick} />
          <Bench bench={this.state.bench} className="half" />
          {
            this.props.children ||
              <Link to={reviewURL}>Leave a Review</Link>
          }
        </div>
      );
  }
});

module.exports = BenchShow;
