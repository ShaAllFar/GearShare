'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope','postService', 'imageService',  HomeController];

function HomeController($log, $rootScope, postService, imageService){
  $log.debug('HomeController');

  this.homePostArray = [];
  this.homeImageArray = [];

  // this.fetchPostImages = () => {
  //   imageService.fetchPostImages(this.post)
  //   .then(images => {
  //     images.forEach( image => {
  //       this.homeImageArray.push(image);
  //       console.log('home Images',this.homeImageArray);
  //     });
  //     return this.homeImageArray;
  //   })
  // }
  // this.fetchPostImages();

  // this.getImages = () => {
  //   console.log('asaasaasa');
  //   imageService.getImages(this.post, this.image )
  //   .then (image => {
  //     console.log('image', image);
  //   })
  //   .catch(err => {
  //     $log.error(err);
  //   })
  // }
  // this.getImages();

  // this.fetchAllPostsFromDB = () => {
  //   postService.fetchAllPostsFromDB()
  //
  //   .then( (posts) => {
  //     // this.homePostArray = [];
  //     posts.data.forEach( (post) => {
  //       this.homePostArray.push(post);
  //
  //       console.log(this.homePostArray);
  //     });
  //     return this.homePostArray;
  //   });
  //
  // };
  // this.fetchAllPostsFromDB();

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
