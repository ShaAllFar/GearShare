'use strict';

module.exports = ['$q', '$log', '$http', 'authService', 'galleryService', postService];

function postService($q, $log, $http, authService, galleryService) {
  $log.debug('postService()');

  let service = {};
  service.allPosts = [];

  service.createPost = function(post) {
    $log.debug('postService.createPost()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/`
    })
  }
}
