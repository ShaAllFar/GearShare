'use strict';

require('./_profile.scss');

module.exports = ['$log', '$location', '$rootScope', 'postService', ProfileController];

function ProfileController($log, $location, postService) {
  $log.debug('ProfileController');

  $location.url('/profile');
}
