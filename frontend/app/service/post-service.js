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
      let url = `${__API_URL__}/api/gallery/:galleryID/post`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, post, config);
    })
    .then( res => {
      $log.log('post created');

      let post = res.data;
      service.allPosts.unshift(post);
      return post;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchAllPosts = function() {
    $log.debug('postService.fetchAllPosts()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/:galleryID/post`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.get(url, config);
    })
    .then( res => {
      $log.log('all posts retrieved');
      service.allPosts = res.data;
      return service.allPosts;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };
  
}
