/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetObj) {
  const $tweet = $(`
  <article class="tweet">
    <header class="user-info">
      <img src="${tweet.user.avatars}" alt="User Icon">
      <h2>${tweet.user.name}</h2>
      <span class="handle">${tweet.user.handle}</span>
    </header>
    <div class="tweet-content">
      <p>${tweet.content.text}</p>
    </div>
    <footer class="tweet-footer">
      <span class="tweet-date">${timeago.format(tweet.created_at)}</span>
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

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
// eslint-disable-next-line no-undef
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.