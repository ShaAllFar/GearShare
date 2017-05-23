'use strict';

module.exports = {
  template: require('./home-posts.html'),
  controller: ['$log', 'postService', HomePostController],
  controllerAs: 'homePostCtrl',
  bindings: {
    post: '<',
    image: '<'
  }
};

function HomePostController($log, postService) {
  $log.debug('HomePostController');

  this.postArray = [];
  this.arrayOfImageIDs = [];

  this.fetchAllPostsFromDB = () => {
    postService.fetchAllPostsFromDB()

    .then( (posts) => {

      posts.data.forEach( (posts) => {
      // console.log(posts);

        this.postArray.push(posts);
      });

      this.postArray.forEach((images) => {
        this.arrayOfImageIDs.push(images._id);
      });

      return this.postArray;
    })
    .catch(err => {
      $log.error(err);
    });

  };
  this.fetchAllPostsFromDB();
}
