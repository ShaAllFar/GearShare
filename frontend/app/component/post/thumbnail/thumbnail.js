'use strict';

module.exports = {
  template: require('./thumbnail.html'),
  controller: ['$log', 'imageService', ThumbnailController],
  controllerAs: 'thumbnailCtrl',
  bindings: {
    image: '<',
    post: '<'
  }
};

function ThumbnailController($log, imageService) {
  $log.debug('ThumbnailController');

  $log.log('haha',this.image)

  // this.fetchedImages = [];
  //
  // this.fetchPostImages = function() {
  //   $log.debug('thumbnailCtrl.fetchPostImages');
  //
  //   imageService.fetchPostImages(this.post)
  //   .then(image => {
  //     console.log('IMAGE', image);
  //     this.fetchedImages = image;
  //     console.log('ARRAY', this.fetchedImages);
  //   });
  // };

  // this.fetchPostImages();

  this.deletePostImage = function() {
    $log.debug('thumbnailCtrl.deletePostImage()');

    imageService.deletePostImage(this.post, this.image);
  };
}
