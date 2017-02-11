'use strict';

require('./_post.scss');

module.exports = {
  template: require('./post.html'),
  controller: ['$log', 'postService', PostController],
  controllerAs: 'postCtrl',
  bindings: {
    image: '<',
    post: '<',
  }
};

function PostController($log, postService) {
  $log.debug('PostController');

  this.editPost = function() {
    $log.debug('postCtrl.editPost()');
    postService.updatePost(this.gallery, this.post)
    .then( () => {
      $log.debug('post updated');
    })
    .catch( err => {
      $log.error(err.message);
    });
  };

  this.removePost = function() {
    $log.debug('postCtrl.removePost()');
    postService.deletePost(this.gallery, this.post)
    .then( () => {
      $log.debug('post deleted');
    })
    .catch( err => {
      $log.error(err.message);
    });
  };
}
