'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope','postService', HomeController];

function HomeController($log, $rootScope, postService){
  $log.debug('HomeController');

  this.homePostArray = [];

  this.fetchAllPostsFromDB = () => {
    postService.fetchAllPostsFromDB()

    .then( (posts) => {
      posts.data.forEach( (post) => {
        this.homePostArray.push(post);
      });
      return this.homePostArray;
    });

  };
  this.fetchAllPostsFromDB();
}
