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
  $log.debug('UploadImageController');

  this.image = {};

  this.uploadPostImage = function(files) {
    // console.log(files);
    imageService.uploadPostImage(this.post, files)
    .then(() => {
      console.log(this.image);
      console.log('POST', this.post);
      // this.image.name = null;
      // this.image.desc = null;
      this.image.image = null;
    });
  };
}
