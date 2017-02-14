'use strict';

require('./_profile.scss');

module.exports = ['$log', '$location', '$rootScope', 'postService', 'galleryService',ProfileController];

function ProfileController($log, $location, $rootScope, postService, galleryService) {
  $log.debug('ProfileController');
  console.log(postService);

  $location.url('/profile');

  this.posts = [];
  // this.gallery = [];


  this.fetchUserGallery = function() {
    postService.fetchUserGallery();
    // .then( posts => {
    //   this.posts = posts;
  };

  this.fetchUserGallery();

  this.fetchUserPosts = function() {
    postService.fetchUserPosts()
    .then( posts => {
      this.posts = posts;
    });
  };

  this.fetchUserPosts();

  $rootScope.$on('locationChangeSuccess', () => {
    this.fetchUserGallery();
  });
}
