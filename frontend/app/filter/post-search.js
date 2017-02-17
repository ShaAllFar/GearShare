'use strict';

module.exports = function(){
  return function(posts, searchTerm){
    let fuzzyRegex = generateFuzzyRegex(searchTerm);
    return posts.filter(post => {
      return fuzzyRegex.test(post.name.toUpperCase()) || fuzzyRegex.test(post.desc.toUpperCase()) || fuzzyRegex.test(post.category.toUpperCase()) || fuzzyRegex.test(post.price);
    });
  };
};

function generateFuzzyRegex(input){
  if(!input) return /.*/;
  let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
  return new RegExp(fuzzyString);
}
