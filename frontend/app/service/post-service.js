'use strict';

module.exports = ['$q', '$log', '$http', 'authService', postService];

function postService($q, $log, $http, authService) {
  $log.debug('postService()');

  let service = {};
  service.allPosts = [];

  service.createPost = (post) => {
    $log.debug('postService.createPost()');

    return authService.getToken()
    .then( token => {

      let url = `${__API_URL__}/api/gallery/${authService.currentGalleryID}/post`; // eslint-disable-line

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
  service.updatePost = (postID, postData) => {
    $log.debug('postService.updatePost');

    return authService.getToken()
    .then( token => {

      let url = `${__API_URL__}/api/gallery/${authService.currentGalleryID}/post/${postID}`; // eslint-disable-line
      
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      return $http.put(url, postData, config);
    })
    .then( res => {
      for (let i = 0; i < service.allPosts.length; i++) {
        let current = service.allPosts[i];
        if (current._id === postID) {
          service.allPosts[i] = res.data;
          break;
        }
      }
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deletePost = function(postID) {
    $log.debug('postService.deletePost()');

    return authService.getToken()
    .then( token => {

      let url = `${__API_URL__}/api/gallery/${authService.currentGalleryID}/post/${postID}`; // eslint-disable-line

      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      return $http.delete(url, config);
    })
    .then( res => { //eslint-disable-line
      for (let i = 0; i < service.allPosts.length; i++) {
        let current = service.allPosts[i];
        if (current._id === postID) {
          service.allPosts.splice(i, 1);
          break;
        }
      }
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchAllPostsFromDB = function() {
    $log.debug('postService.fetchAllPostsFromDB()');

    let url = `${__API_URL__}/api/post`; //eslint-disable-line
    let config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
    return $http.get(url, config);
  };

  service.fetchUserGallery = function() {
    $log.debug('postService.fetchUserGallery()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${authService.currentGalleryID}`; // eslint-disable-line

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
      $log.log('user gallery (allPosts) retrieved');
      let gallery = res.data;
      return gallery;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchUserPosts = function() {
    $log.debug('postService.fetchUserPosts');

    authService.getUserId();

    return authService.getGalleryId()
    .then( () => {
      return authService.getToken();
    })
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${authService.currentGalleryID}/post`; //eslint-disable-line
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.get(url, config);
    })
    .then( res => {
      $log.log('user posts retrieved');
      service.allPosts = res.data;
      return service.allPosts;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
