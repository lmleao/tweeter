/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  
  const createTweetElement = function(tweet) {

    const formatTimestamp = (timestamp) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(timestamp).toLocaleDateString('en-US', options);
    };

    let $tweet = $(`
    <article class="tweet">
      <header class="user-info">
        <img src="${tweet.user.avatars}" alt="User Icon">
        <h2 class="display-name">${tweet.user.name}</h2>
        <span class="handle">${tweet.user.handle}</span>
      </header>
      <div class="tweet-content">
        <p>${tweet.content.text}</p>
      </div>
      <footer class="tweet-footer">
        <span class="tweet-date">${formatTimestamp(tweet.created_at)}</span>
        <div class="tweet-icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
    `);
  
    return $tweet;
  };
  
  const renderTweets = function(tweets) {
    const $tweetsContainer = $('#tweets-container');
  
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.append($tweet);
    });
  };

  $('form').submit(function(event) {
    event.preventDefault();

    const formData = $(this).serialize();

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: formData
    })
      .done(function(response) {
        renderTweets([response]);
      })
      .fail(function(error) {
        console.error('Error submitting tweet:', error);
      });
  });
  
  renderTweets(data);
  
});