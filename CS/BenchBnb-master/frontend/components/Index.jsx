var React = require('react');
var IndexItem = require('./IndexItem');

var Index = React.createClass({
  handleItemClick: function (bench) {
    this.props.history.pushState(null, "benches/" + bench.id );
  },
  render: function(){
    var handleItemClick = this.handleItemClick;
    return (
      <div>
        <h1>Index</h1>
        {
          this.props.benches.map(function(bench){
            var boundClick = handleItemClick.bind(null, bench);
            return <IndexItem
              onClick={boundClick}
              bench={bench}
              key={bench.id} /> 
          })
        }
      </div>
    );
  }
});

module.exports = Index;
