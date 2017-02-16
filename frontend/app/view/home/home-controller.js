'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope','postService', HomeController];

function HomeController($log, $rootScope, postService){
  $log.debug('HomeController');

  this.homePostArray = [];

  this.fetchAllPostsFromDB = () => {
    postService.fetchAllPostsFromDB()

    .then( (posts) => {
      this.homePostArray = [];
      posts.data.forEach( (post) => {
        this.homePostArray.push(post);
      });
      return this.homePostArray;
    });

  };
  this.fetchAllPostsFromDB();

  this.filterByNewest = function(){
    this.homePostArray.sort((a,b) => {
      return a.created < b.created;
    });
  }

  this.filterByCategory = function(category){
    let filteredArr;
    postService.fetchAllPostsFromDB()
    .then( (posts) => {
      this.homePostArray = [];
      posts.data.forEach( (post) => {
        this.homePostArray.push(post);
      });
      return this.homePostArray;
    })
    .then(() => {
      filteredArr = this.homePostArray.filter(post => {
        console.log(post.category);
        return post.category.toString() === category;
      })
      this.homePostArray = filteredArr;
    })
  }


}
