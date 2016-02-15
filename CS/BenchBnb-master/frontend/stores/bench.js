var Store = require('flux/utils').Store;
var _benches = [];
var CHANGE_EVENT = "change";
var BenchConstants = require('../constants/bench_constants');
var AppDispatcher = require('../dispatcher/dispatcher');
var BenchStore = new Store(AppDispatcher);

var resetBenches = function(benches){
  _benches = benches.slice(0);
}

BenchStore.all = function () {
  return _benches.slice(0);
};

BenchStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case BenchConstants.BENCHES_RECEIVED:
      var result = resetBenches(payload.benches);
      BenchStore.__emitChange();
      break;
  }
};

module.exports = BenchStore;
