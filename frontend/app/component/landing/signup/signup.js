'use strict';

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'signupCtrl'
};

function SignupController($log, $location, authService){
  $log.debug('SignupController');
  
  authService.getToken()
  .then(() => {
    $location.url('/home');
  }).catch(err => {
    $log.error(err.message);
  });

  this.signup = function(user){
    $log.log('SignupController.signup()');

    authService.signup(user)
    .then(() => {
      authService.getUserId();
    })
    .then(() => {
      $location.url('/home');
    });
  };
}
