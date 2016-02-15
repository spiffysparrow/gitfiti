var React = require('react');
var ReactRouter = require('react-router');

var IndexItem = React.createClass({
  mixins: [ReactRouter.history],
  render: function(){
    var bench = this.props.bench;
    return (
        <div className="bench-index-item" onClick={this.props.onClick}>
          {bench.description}
          <br/>
          Rating: {bench.average_rating || "No reviews yet"}
          <br/>
          <img src={bench.picture_url}/>
        </div>
    );
  }
});

module.exports = IndexItem;
