'use strict';

module.exports = {
  template: require('./home-posts.html'),
  controller: ['$log', 'postService', HomePostController],
  controllerAs: 'homePostCtrl',
  bindings: {
    post: '<'
  }
};

function HomePostController($log, postService) {
  $log.debug('HomePostController');

  // this.fetchAllPostsFromDB = function() {
  //   postService.fetchAllPostsFromDB()
  //
  //   .then( (posts) => {
  //     this.homePostArray = posts;
  //   });
  //
  // };
  // this.fetchAllPostsFromDB();
}
