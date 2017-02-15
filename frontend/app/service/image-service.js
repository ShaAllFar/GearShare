'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', imageService];

function imageService($q, $log, $http, Upload, authService) {
  $log.debug('imageService');

  let service = {};

  service.uploadPostImage = function(galleryID, galleryData, postID, files) {
    $log.debug('uploadPostImage');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${authService.currentGalleryID}/post/${postID}/image`; //eslint-disable-line
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
              file: files[i]
            }
          })
          .then(res => {
            galleryData.images.unshift(res.data);
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

  service.deletePostImage = function(galleryID, galleryData, postID, imageData) {
    $log.debug('imageService.deletePostImage');
    console.log(imageData);

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${authService.currentGalleryID}/post/${postID}/image/${imageData._id}`; //eslint-disable-line
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      return $http.delete(url, config);
    })
    .then(() => {
      for(let i = 0; i < galleryData.images.length; i++) {
        let current = galleryData.images[i];
        if(current._id === imageData._id) {
          galleryData.images.splice(i, 1);
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
