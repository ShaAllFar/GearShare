'use strict';

module.exports = {
  template: require('./user.html'),
  controller: ['$log', 'profileService', 'authService', UserController],
  controllerAs: 'userCtrl',
  bindings: {
    user: '<'
  }
};

function UserController($log, profileService, authService){
  $log.debug('UserController');

  this.changeEdit = {
    showEditProfile: false
  };
  // this.showEditProfile = false;

  this.user = null;
  this.fetchUserData = function(){
    profileService.fetchUserData()
    .then(user => {
      $log.log('got user');
      this.user = user;
    });
  };
  this.fetchUserData();

  this.fetchGallery = function (){
    authService.getGalleryId()
    .then(gallery => {
      $log.log('user, galleryData', gallery);
    });
  };
}
