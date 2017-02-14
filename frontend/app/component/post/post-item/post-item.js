'use strict';

require('./_post-item.scss');

module.exports = {
  template: require('./post-item.html'),
  controller: ['$log', 'postService', PostItemController],
  controllerAs: 'postItemCtrl',
  bindings: {
    gallery: '<',
    post: '<'
  }
};

function PostItemController($log, postService) {
  $log.debug('PostItemController');

  this.showEditPost = false;

  this.removePost = function() {
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
