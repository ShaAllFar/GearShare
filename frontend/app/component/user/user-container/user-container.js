'use strict';

module.exports = {
  template: require('./user-container.html'),
  controller: ['$log', '$location', UserContainerController],
  controllerAs: 'userContainerCtrl',
  bindings: {
    user: '<'
  }
};

function UserContainerController($log, $location){
  $log.debug('UserContainerController');

  this.goHome = function() {
    $log.debug('homeCtrl.goHome()');
    $location.url('/home');
  };

  this.goMessage = () => {
    $log.debug('messageCtrl.goMessage()');
    $location.url('/message');
  };
}
