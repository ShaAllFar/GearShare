'use strict';

require('./_gallery.scss');

module.exports = {
  template: require('./gallery.html'),
  controller: ['$log', 'galleryService', CreateGalleryController],
  controllerAs: 'createGalleryCtrl',
  bindings: {
    gallery: '<',
    post: '<'
  }
};

function CreateGalleryController($log, galleryService) {
  $log.debug('CreateGalleryController');

  this.gallery = {};

  this.createGallery = function() {
    galleryService.createGallery(this.gallery)
    .then ( () => {
      this.gallery.name = null;
      this.gallery.desc = null;
    });
  };
}
