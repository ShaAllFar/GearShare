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

  this.postArray = [];
  this.arrayOfImageIDs = [];

  this.fetchAllPostsFromDB = () => {
    postService.fetchAllPostsFromDB()

    .then( (posts) => {
      console.log(posts);
      posts.data.forEach( (posts) => {
        console.log('XXXXXX');
        this.postArray.push(posts);
      });

      this.postArray.forEach((images) => {
        console.log('AAAAAA');
        this.arrayOfImageIDs.push(images._id);
      });

      console.log('IMAGE-IDS', this.arrayOfImageIDs);
      return this.postArray;
    })
    .catch(err => {
      $log.error(err);
    });

  };
  this.fetchAllPostsFromDB();

  console.log('POST', this.postArray);
  this.getImages = () => {
    imageService.getImages(this.postArray._id, this.arrayOfImageIDs)
    .then (image => {
      // console.log('POST', this.homePostArray.post);
      console.log('image', image);
    })
    .catch(err => {
      $log.error(err);
    });
  };
  this.getImages();
}
