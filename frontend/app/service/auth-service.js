'use strict';
const JWT = require('jwt-client');
module.exports = ['$q', '$log', '$http', '$window', authService];

function authService($q, $log, $http, $window) {
  $log.debug('authService');

  let service = {};
  let token = null;
  service.currentUserID = null;


  function setToken(_token){
    $log.debug('authService.setToken()');

    if(! _token){
      return $q.reject(new Error('no token'));
    }

    $window.localStorage.setItem('token', _token);
    token = _token;
    return $q.resolve(token);
  }

  service.getToken = function(){
    $log.debug('authService.getToken()');

    if(token){
      return $q.resolve(token);
    }


    if(token) return $q.resolve(token);


    return $q.reject(new Error('token not found'));
  };

  service.logout = function(){
    $log.debug('authService.logout()');

    $window.localStorage.removeItem('token');
    token = null;
    return $q.resolve();
  };

  service.signup = function(user){
    $log.debug('authService.signup()');

    let url = `${__API_URL__}/api/signup`; // eslint-disable-line
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };

    return $http.post(url, user, config)
    .then(res => {
      service.userData = res;
      $log.log('success', res.data);
      return setToken(res.data);
    })
    .then( () => {
      let gallery = {
        name: 'shit',
        desc: 'turtle'
      };
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
    .then( (gallery) => {
      console.log('gallery created on signup');



      console.log(gallery);
      this.galleryID = gallery.data._id;

    })
    .catch(err => {
      $log.error('failure', err.message);
      return $q.reject(err);
    });
  };

  service.login = function(user){
    $log.debug('authService.signin()');

    let url = `${__API_URL__}/api/signin`; // eslint-disable-line
    let base64 = $window.btoa(`${user.username}:${user.password}`);
    let config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`
      }
    };

    return $http.get(url, config)
    .then(res => {
      $log.log('authService.signin()');
      service.userData = user.username;
      return setToken(res.data);
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };
  service.getUserId = function(){
    token = $window.localStorage.getItem('token');

    let parseToken = JWT.read(token);
    service.currentUserID = parseToken.claim.userID;

    $log.debug('currentUserID', service.currentUserID);

    return service.currentUserID;
  }

  return service;

}
