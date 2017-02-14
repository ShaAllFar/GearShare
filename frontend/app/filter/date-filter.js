'use strict';

module.exports = function(){
  return function(posts, postDate){
    return posts.sort(compareDates);
  };
}

function compareDates(a,b){
  return a.createdOn > b.createdOn;
}
