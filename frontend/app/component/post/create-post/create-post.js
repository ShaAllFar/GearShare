'use strict';

require('./_create-post.scss');

module.exports = {
  template: require('./create-post.html'),
  controller: ['$log', 'postService', CreatePostController],
  controllerAs: 'createPostCtrl',
  bindings: {
    image: '<',
    post: '<',
  }
};

function CreatePostController($log, postService) {
  $log.debug('CreatePostController');

  this.post = {};

  this.createPost = function() {
    postService.createPost(this.post)
    .then( () => {
      this.post.name = null;
      this.post.desc = null;
      this.post.price = null;
      this.post.category = null;
      this.post.userID = null;
      this.post.galleryID = null;
    });
  };
}
