'use strict';

module.exports = {
  template: require('./user-container.html'),
  controller: ['$log', UserContainerController],
  controllerAs: 'userContainerCtrl',
  bindings: {
    user: '<'
  }
};

function UserContainerController($log){
  $log.debug('UserContainerController');
}
