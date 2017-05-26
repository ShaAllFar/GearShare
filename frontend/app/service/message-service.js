'use strict';

module.exports = ['$log', '$http', 'authService', messageService];

function messageService($log, $http, authService) {

  let service = {};
  service.users = {};

  service.fetchAllUsers = function() {
    $log.debug('messageService.fetchAllUsers()');

    let url = `${__API_URL__}/api/users`; //eslint-disable-line
    let config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
    return $http.get(url, config);
  };

}
