'use strict';

module.exports = ['$q', '$log', '$http', 'authService', postService];

function postService($q, $log, $http, authService) {
  $log.debug('postService()');

  let service = {};
  service.allPosts = [];
  // console.log(service.allPosts);
  // service.allPosts.push('Anything');
  // console.log(service.allPosts);
  // console.log(service.allPosts.push('Anything'));

  service.createPost = (post, galleryID) => {
    $log.debug('postService.createPost()');

    return authService.getToken()
    .then( token => {
<<<<<<< HEAD
      let url = `${__API_URL__}/api/gallery/58a351c262bad25899e6f948/post`; // eslint-disable-line
=======
      let url = `${__API_URL__}/api/gallery/${authService.currentGalleryID}/post`; // eslint-disable-line
>>>>>>> staging
      // let url = `${__API_URL__}/api/gallery/`;
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

      console.log(res.data);
      let post = res.data;
      // console.log('WHATISTHIS?', service.allPosts);
      // console.log('FUCK THIS', service.allPosts);

      service.allPosts.push(post);
      console.log(service.allPosts);
      return post;

    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchUserGallery = function() {
    $log.debug('postService.fetchUserGallery()');

    return authService.getToken()
    .then( token => {
      console.log(authService);
      // let url = `${__API_URL__}/api/gallery/${authService.galleryID}/post`;
<<<<<<< HEAD
      let url = `${__API_URL__}/api/gallery/58a351c262bad25899e6f948`; // eslint-disable-line
=======
      let url = `${__API_URL__}/api/gallery/${authService.currentGalleryID}`; // eslint-disable-line
>>>>>>> staging
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
      // console.log(res.data);
      let gallery = res.data;
      // service.allPosts.unshift(post);
      return gallery;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchUserPosts = function() {
    $log.debug('postService.fetchUserPosts');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/58a351c262bad25899e6f948/post`;
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

  service.updatePost = function(galleryID, postID, postData) {
    $log.debug('postService.updatePost');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}/post/${postID}`; // eslint-disable-line
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

  service.deletePost = function(galleryID, postID) {
    $log.debug('postService.deletePost()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}/post/${postID}`; // eslint-disable-line
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      return $http.delete(url, config);
    })
    .then( res => {
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

  return service;
}
