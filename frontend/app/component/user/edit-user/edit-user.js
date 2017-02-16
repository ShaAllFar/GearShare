'use strict';

module.exports = {
  template: require('./edit-user.html'),
  controller: ['$log', 'profileService','authService', EditUserController],
  controllerAs: 'editUserCtrl',
  bindings: {
    user: '<'
  }
};

function EditUserController($log, profileService, authService){
  $log.debug('EditUserController');

  this.updateUserInfo = function(){
    $log.debug('editUserCtrl.updateUserInfo()');

    profileService.updateUserInfo(authService.currentUserID, this.user)
    .then(() => {
      $log.log('user updated');
    })
    .catch(err => {
      $log.error(err.message);
    });
  };
}
