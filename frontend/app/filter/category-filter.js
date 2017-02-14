'use strict';

module.exports = function(){
  return function(posts, categoryName){
    return posts.filter(post => {
      return post.category === categoryName;
    });
  };
};
