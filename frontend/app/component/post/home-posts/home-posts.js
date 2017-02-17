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

  // this.homePostArray = [];
  //
  // this.fetchAllPostsFromDB = () => {
  //   postService.fetchAllPostsFromDB()
  //
  //   .then( (posts) => {
  //     // this.homePostArray = [];
  //     posts.data.forEach( (post) => {
  //       this.homePostArray.push(post);
  //     });
  //     console.log('this',this.homePostArray);
  //     return this.homePostArray;
  //   })
  //   .catch(err => {
  //     $log.error(err);
  //   })
  //
  // };
  // this.fetchAllPostsFromDB();
}
