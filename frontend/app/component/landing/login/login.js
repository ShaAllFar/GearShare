'use strict';

module.exports = {
  template: require('./login.html'),
  controller: ['$log', '$location', 'authService', LoginController],
  controllerAs: 'loginCtrl'
};

function LoginController($log, $location, authService){
  $log.debug('LoginController');

  authService.getToken()
  .then(() => {
    $location.url('/home');
  }).catch(err => {
    $log.error(err.message);
  });

  this.login = function(user){
    $log.log('loginCtrl.login()');

    authService.login(this.user)
    .then(() => {
      authService.getUserId();
    })
    .then(() => {
      $location.url('/home');
    });
  };
}
