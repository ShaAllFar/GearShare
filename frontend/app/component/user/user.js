'use strict';

require('./_user.scss');

module.exports = {
  template: require('./user.html'),
  controller: ['$log', 'profileService', 'authService', UserController],
  controllerAs: 'userCtrl',
};


function UserController($log, profileService, authService){
  $log.debug('UserController');
  this.user = null;
  this.fetchUserData = function(){
    profileService.fetchUserData()
    .then(user => {
      $log.log('got user', user);
      this.user = user;
    });
  };
  // this.fetchUserData();

  this.fetchGallery = function (){
    authService.getGalleryId()
    .then(gallery => {
      $log.log('user, galleryData', gallery);
    });
  };
  // this.fetchGallery();
}
