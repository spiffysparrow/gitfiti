var ApiActions = require('../actions/api_actions');
var FilterParamsStore = require('../stores/filter_params');

var ApiUtil = {
  fetchBenches: function(){
    var filter = FilterParamsStore.params();
    $.get('api/benches', filter, function(benches){
      ApiActions.receiveAll(benches);
    });
  },
  createBench: function(data){
    $.post('api/benches', { bench: data }, function(bench) {
      ApiActions.receiveAll([bench]);
    });
  },
  createReview: function(data) {
    $.post('api/reviews', { review: data }, function (bench) {
      ApiActions.receiveAll([bench]);
    });
  }
};

module.exports = ApiUtil;
