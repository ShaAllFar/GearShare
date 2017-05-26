'use strict';

module.exports = {
  template: require('./all-users.html'),
  controller: ['$log', AllUsersController],
  controllerAs: 'allUsersCtrl',
  bindings: {
    user: '<',
  }
};

function AllUsersController($log) {
  $log.debug('allUsersCtrl()');
}
