'use strict';

// require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavbarController],
  controllerAs: 'navbarCtrl'
};

function NavbarController($log, $location, $rootScope, authService){
  $log.debug('NavbarController');

  this.checkPath = function(){
    let path = $location.path();

    if(path === '/join'){
      this.hideNavbar = true;
    }

    if(path !== '/join'){
      this.hideNavbar = false;
      authService.getToken()
      .catch(() => {
        $location.url('/join#login');
      });
    }
  };

  this.checkPath();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });

  this.logout = function(){
    $log.debug('navbarCtrl.logout()');
    authService.logout()
    .then(() => {
      $location.url('/');
    });
  };

  this.newPost = function() {
    $log.debug('navbarCtrl.newPost()');
    $location.url('/profile');
  };
}
