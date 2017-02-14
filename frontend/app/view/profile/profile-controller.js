'use strict';

require('./_profile.scss');

module.exports = ['$log', '$location', '$rootScope', 'postService', 'galleryService',ProfileController];

function ProfileController($log, $location, $rootScope, postService, galleryService) {
  $log.debug('ProfileController');

  $location.url('/profile');

  this.posts = [];
  // this.gallery = [];

  // this.fetchUserGallery = function() {
  //   galleryService.fetchUserGallery()
  //   .then( gallery => {
  //     this.gallery = gallery;
  //     console.log(gallery);
  //   });
  // };

  this.fetchUserGallery = function() {
    postService.fetchUserGallery()
    .then( posts => {
      this.posts = posts;
    });
  };

  this.fetchUserGallery();

  $rootScope.$on('locationChangeSuccess', () => {
    this.fetchUserGallery();
  });
}
