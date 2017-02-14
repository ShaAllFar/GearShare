'use strict';

require('./_edit-post.scss');

module.exports = {
  template: require('./edit-post.html'),
  controller: ['$log', 'postService', EditPostController],
  controllerAs: 'editPostCtrl',
  bindings: {
    image: '<',
    post: '<',
  }
};

function EditPostController($log, postService) {
  $log.debug('EditPostController');

  this.post = {};

  this.editPost = function() {
    $log.debug('editPostCtrl.editPost()');
    postService.updatePost(this.gallery, this.post)
    .then( () => {
      $log.debug('post updated');
    })
    .catch( err => {
      $log.error(err.message);
    });
  };

}
