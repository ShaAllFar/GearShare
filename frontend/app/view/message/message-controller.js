'use strict';

require('./_message.scss');

module.exports = ['$log', '$rootScope', 'messageService', MessageController];

function MessageController($log, $rootScope, messageService) {
  $log.debug('messageCtrl()');

  this.usersArray = [];

  this.fetchAllUsers = function() {
    messageService.fetchAllUsers()
    .then(users => {
      this.usersArray = [];
      users.data.forEach( (user) => {
        this.usersArray.push(user);
      });
      $log.log('got all users');
      console.log(this.usersArray);
      return this.usersArray.reverse();
    });
  };


  this.fetchAllUsers();

  // this.fetchAllPostsFromDB = () => {
  //   postService.fetchAllPostsFromDB()
  //
  //   .then( (posts) => {
  //     this.homePostArray = [];
  //     posts.data.forEach( (post) => {
  //       this.homePostArray.push(post);
  //     });
  //     return this.homePostArray.reverse();
  //   });
  // };
  //
  // this.fetchAllPostsFromDB();


}
