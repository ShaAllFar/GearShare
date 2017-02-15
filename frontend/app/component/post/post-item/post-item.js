'use strict';

require('./_post-item.scss');

module.exports = {
  template: require('./post-item.html'),
  controller: ['$log', 'postService', PostItemController],
  controllerAs: 'postItemCtrl',
  bindings: {
    post: '<'

  }
};

function PostItemController($log, postService) {
  $log.debug('PostItemController');

  this.showEditPost = false;

  this.deletePost = function() {
    $log.debug('editPostCtrl.removePost()');
    postService.deletePost(this.post._id)
    .then( () => {
      $log.debug('post deleted');
    })
    .catch( err => {
      $log.error(err.message);
    });
  };
}
