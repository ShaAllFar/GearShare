'use strict';

module.exports = ['$log', '$location', LandingController];

function LandingController($log, $location) {
  $log.debug('LandingController');

  this.toggleView = {
    showLoginForm: false,
    showSignupForm: false
  };

  let url = $location.url();
  this.showSignup = url === '/join#signup' || url === '/join';
}
