'use strict';

require('./_message.scss');

module.exports = ['$log', '$rootScope', 'messageService', MessageController];

function MessageController($log, $rootScope, messageService) {
  $log.debug('messageCtrl()');

  this.users = null;

  this.fetchAllUsers = function() {
    messageService.fetchAllUsers()
    .then(users => {
      $log.log('got all users');
      this.users = users;
    });
  };

  this.fetchAllUsers();


}
