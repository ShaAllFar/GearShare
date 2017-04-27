'use strict';

module.exports = {
  template: require('./chat.html'),
  controller: ['$log', ChatController],
  controllerAs: 'chatCtrl'
};

function ChatController($log) {
  $log.debug('chatCtrl()');

  var chatList = document.getElementById('chat-list');
  var chatForm = document.getElementById('chat-form');
  var allComments = [];

  var Comment = function(text) {
    // this.userName = userName;
    this.text = text;
  };

  Comment.prototype.render = function() {
    var li = document.createElement('li');
    li.innerHTML =  this.text;
    return li;
  };

  function renderAllComments() {
    chatList.innerHTML = '';

    allComments.forEach(function(chats) {
      chatList.appendChild(chats.render());
    });
  }

  function handleCommentSubmit(event) {
    event.preventDefault();

    if (!event.target.says.value) {
      return alert('Fields wont work empty');
    }

    // var commenter = event.target.user.value;
    var remark = event.target.says.value;

    var newComment = new Comment(remark);

    // event.target.user.value = null;
    event.target.says.value = null;

    allComments.push(newComment);
    console.log(allComments);
    renderAllComments();
  }

  chatForm.addEventListener('submit', handleCommentSubmit);






}
