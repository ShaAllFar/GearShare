'use strict';

module.exports = ['$q', '$log', '$http', 'Upload','authService', profileService];

function profileService($q,$log, $http, Upload, authService){

  let service = {};
  service.userData = {};

  service.fetchUserData = function(){
    $log.debug('profileService.fetchUserData()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/profile/${authService.currentUserID}`; // eslint-disable-line
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('user data retrieved');
      service.userData = res.data;
      if(!service.userData.profileImageURI){
        service.userData.profileImageURI = 'https://s-media-cache-ak0.pinimg.com/236x/dc/26/8b/dc268be243b9176a64ebf2fe7aa47ba1.jpg';
      }
      $log.log('service.userData', service.userData);
      return service.userData;
    })
    .catch( err => {
      $log.error('aaaaa',err.message);
    });
  };

  service.updateUserInfo = function(userID, userData){
    $log.debug('profileService.updateUserInfo()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/profile/${userID}`; // eslint-disable-line
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.put(url, userData, config);
    })
    .then(res => {
      service.userData = res.data;
      return service.userData;
    })
    .catch(err => {
      $log.error(err.message);
    });
  };

  service.uploadProfileImage = function( file){
    $log.debug('uploadProfileImage');
    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/profile/${authService.currentUserID}/image`; // eslint-disable-line
      let headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      };
      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          image: file
        }
      });
    })
    .then(res => {
      $log.log('image response', res.data);
      return res.data;
    })
    .catch(err => {
      $log.log('something', err.message);
      $log.error(err.message);
    });
  };

  return service;
}
