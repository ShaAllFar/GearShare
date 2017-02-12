'use strict';

require('./_profile.scss');

module.exports = ['$log', '$location', '$rootScope', 'postService', ProfileController];

function ProfileController($log, $location, $rootScope, postService) {
  $log.debug('ProfileController');

  $location.url('/profile');

  this.posts = [];

  this.fetchAllPosts = function() {
    postService.fetchAllPosts()
    .then( posts => {
      this.posts = posts.reverse();
    });
  };

  this.fetchAllPosts();

  $rootScope.$on('locationChangeSuccess', () => {
    this.fetchAllPosts();
  });
}
