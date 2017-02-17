'use strict';

module.exports = {
  template: require('./home-posts.html'),
  controller: ['$log', 'postService', 'imageService', HomePostController],
  controllerAs: 'homePostCtrl',
  bindings: {
    post: '<',
    image: '<'
  }
};

function HomePostController($log, postService, imageService) {
  $log.debug('HomePostController');

  this.homePostArray = [];

  this.fetchAllPostsFromDB = () => {
    postService.fetchAllPostsFromDB()

    .then( (posts) => {
      // this.homePostArray = [];
      posts.data.forEach( (post) => {
        this.homePostArray.push(post);
      });
      console.log('this',this.homePostArray);
      return this.homePostArray;
    })
    .catch(err => {
      $log.error(err);
    })

  };
  this.fetchAllPostsFromDB();

  this.getImages = () => {
    console.log('asaasaasa');
    imageService.getImages(this.post, this.image )
    .then (image => {
      console.log('image', image);
    })
    .catch(err => {
      $log.error(err);
    })
  }
  this.getImages();
}
