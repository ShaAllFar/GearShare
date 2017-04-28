'use strict';

require('./_profile.scss');

module.exports = ['$log', '$location', '$rootScope', 'postService', ProfileController];

function ProfileController($log, $location, $rootScope, postService) {
  $log.debug('ProfileController');

  $location.url('/profile');

  this.allPosts = [];

  // this.fetchUserGallery = function() {
  //   postService.fetchUserGallery()
  //   .then( posts => {
  //     console.log('got posts', posts);
  //     this.allPosts = posts;
  //   });
  // };
  // this.fetchUserGallery();
  // console.log(postService);
  // console.log('save');

  this.fetchUserPosts = function() {
    postService.fetchUserPosts()
    .then( posts => {
      this.allPosts = posts.reverse();
    });
  };

  this.fetchUserPosts();

  // $rootScope.$on('locationChangeSuccess', () => {
  //   this.fetchUserGallery();
  // });
}
