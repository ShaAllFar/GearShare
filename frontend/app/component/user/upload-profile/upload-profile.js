'use strict';

module.exports = {
  template: require('./upload-profile.html'),
  controller: ['$log', 'profileService', UploadProfileImageController],
  controllerAs: 'uploadProfileImageCtrl',
  bindings: {
    user: '<'
  }
};

function UploadProfileImageController($log, profileService){
  $log.debug('UploadProfileImageController');

  this.image = {};


  this.uploadProfileImage = function(file){
    profileService.uploadProfileImage(file)
    .then(() => {
      console.log('image', this.image);
      this.image.file = null;
    })
    .catch(err => {
      $log.error(err.message);
    });
  };
}
