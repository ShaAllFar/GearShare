'use strict';

require('./_post-bin.scss');

module.exports = {
  template: require('./post-bin.html'),
  controllerAs: 'postBinCtrl',
  bindings: {
    post: '<',
  },
};
