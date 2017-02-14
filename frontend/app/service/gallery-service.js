'use strict';

module.exports = ['$q', '$log', '$http', 'authService', galleryService];

function galleryService($q, $log, $http, authService) {
  $log.debug('galleryService()');

  let service = {};
  service.gallery = [];

  service.createGallery = function(gallery) {
    $log.debug('galleryService.createGallery()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery`; // eslint-disable-line
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, gallery, config);
    })
    .then( res => {
      $log.log('user gallery created');

      let gallery = res.data;
      return gallery;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchUserGallery = function() {
    $log.debug('galleryService.fetchUserGallery()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery`; // eslint-disable-line
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then(res => {
      $log.log('user galleryID retrieved');
      service.gallery = res.data;
      return service.gallery;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });

  };

  return service;
}
