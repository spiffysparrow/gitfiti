var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ReactRouter = require('react-router');
var ApiUtil = require('../util/api_util');

var ReviewForm = React.createClass({
  mixins: [LinkedStateMixin, ReactRouter.history],
  getInitialState: function () {
    return { rating: 5, body: "" };
  },
  navigateToBenchShow: function () {
    var benchUrl = "/benches/" + this.props.params.benchId;
    this.props.history.pushState(null, benchUrl);
  },
  handleCancel: function(event){
    event.preventDefault();
    this.navigateToBenchShow();
  },
  handleSubmit: function(event){
    event.preventDefault();
    var review = $.extend(
      {}, 
      this.state, 
      { bench_id: this.props.params.benchId }
    );
    ApiUtil.createReview(review);
    this.navigateToBenchShow();
  },
  render: function () {
    return (
      <div className="review-form">
        <form onSubmit={this.handleSubmit}>
          <label>Rating</label>
          <br/>
          <input type="number" valueLink={this.linkState('rating')}/>
          <br/>

          <label>Comment</label>
          <br/>
          <textarea 
            cols='30' 
            rows='10' 
            valueLink={this.linkState('body')}></textarea>
          <br/>
          <input type="submit"/>
        </form>
        <button onClick={this.handleCancel}>Cancel</button>
      </div>
    );
 }
});

module.exports = ReviewForm;
