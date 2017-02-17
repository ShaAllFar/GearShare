'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', imageService];

function imageService($q, $log, $http, Upload, authService) {
  $log.debug('imageService');

  let service = {};

  service.getImages = function(postData, imageID){
    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${authService.currentGalleryID}/post/${postData._id}/image/${imageID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url,config);
    })
    .then(res => {
      $log.log('image retrieved');
      return res.data;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });

  };




  service.fetchPostImages = function(postData) {
    $log.debug('fetchPostImages');

    return authService.getGalleryId()
    .then(() => {
      return authService.getToken();
    })
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${authService.currentGalleryID}/post/${postData._id}/image`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.get(url, config);
    })
    .then(res => {
      $log.log('post images retrieved');
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.uploadPostImage = function(postData, files) {
    $log.debug('uploadPostImage');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${authService.currentGalleryID}/post/${postData._id}/image`; //eslint-disable-line
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      };

      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          Upload.upload({
            url,
            headers,
            method: 'POST',
            data: {
              image: files[i]
            }
          })
          .then(res => {
            $log.log('image-service line 58', res.data);
            postData.images.unshift(res.data);
            return res.data;
          })
          .catch(err => {
            $log.error(err.message);
            return $q.reject(err);
          });
        }
      }
    });
  };

  service.deletePostImage = function(postData, imageData) {
    $log.debug('imageService.deletePostImage');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${authService.currentGalleryID}/post/${postData._id}/image/${imageData._id}`; //eslint-disable-line
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      return $http.delete(url, config);
    })
    .then(() => {
      for(let i = 0; i < postData.images.length; i++) {
        let current = postData.images[i];
        if(current._id === imageData._id) {
          postData.images.splice(i, 1);
          break;
        }
      }
      $log.log('image deleted');
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
