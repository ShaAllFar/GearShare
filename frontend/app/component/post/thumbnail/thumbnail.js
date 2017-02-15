'use strict';

module.exports = {
  template: require('./thumbnail.html'),
  controller: ['$log', 'imageService', ThumbnailController],
  controllerAs: 'thumbnailCtrl',
  bindings: {
    image: '<',
    gallery: '<'
  }
};

function ThumbnailController($log, imageService) {
  $log.debug('ThumbnailController');

  this.deletePostImage = function() {
    $log.debug('thumbnailCtrl.deletePostImage()');

    imageService.deletePostImage(this.gallery, this.image);
  };
}
