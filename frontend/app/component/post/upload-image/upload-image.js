'use strict';

module.exports = {
  template: require('./upload-image.html'),
  controller: ['$log', 'imageService', UploadImageController],
  controllerAs: 'uploadImageCtrl',
  bindings: {
    post: '<'
  }
};

function UploadImageController($log, imageService) {
  $log.debug('UploadPicController');

  this.image = {};

  this.uploadPostImage = function() {
    imageService.uploadPostImage(this.post, this.image)
    .then(() => {
      this.image.name = null;
      this.image.desc = null;
      this.image.file = null;
    });
  };
}
