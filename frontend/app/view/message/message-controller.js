'use strict';

require('./_message.scss');

module.exports = ['$log', '$rootScope', 'authService', MessageController];

function MessageController($log, $rootScope, authService) {
  $log.debug('messageCtrl()');


}
