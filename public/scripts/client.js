/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {

    const formatTimestamp = (timestamp) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return timeago.format(timestamp, 'en_US', options);
    };

    let $tweet = $(`
    <article class="tweet">
      <header class="user-info">
        <img src="${escape(tweet.user.avatars)}" alt="User Icon">
        <h2 class="display-name">${escape(tweet.user.name)}</h2>
        <span class="handle">${escape(tweet.user.handle)}</span>
      </header>
      <div class="tweet-content">
        <p>${escape(tweet.content.text)}</p>
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
  
    console.log('Created tweet element:', $tweet);
    return $tweet;
  };
  
  const renderTweets = function(tweets) {
    const $tweetsContainer = $('#tweets-container');
    
    console.log('Received tweets:', tweets);
  
    if (!Array.isArray(tweets)) {
      console.error('Invalid tweet data. Expected an array:', tweets);
      return;
    }
  
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      if ($tweet) {
        $tweetsContainer.prepend($tweet);
      }
    });
  };

  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    })
      .done(function(response) {
        renderTweets(response);
      })
      .fail(function(error) {
        console.error('Error loading tweets:', error);
      });
  };

  const submitTweet = function(tweetText) {
    const $tweetsContainer = $('#tweets-container');

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: { text: tweetText }
    })
      .done(function(response) {
        const $newTweet = createTweetElement(response);
        if ($newTweet) {
          $tweetsContainer.prepend($newTweet);
        }
      })
      .fail(function(error) {
        console.error('Error submitting tweet:', error);
      });
  };

  $('form').submit(function(event) {
    event.preventDefault();

    $('#error-message').slideUp();

    const tweetText = $('#tweet-text').val();

    if (!tweetText) {
      $('#error-message').text('Tweet cannot be empty. Please enter a tweet.').slideDown();
      return;
    }

    if (tweetText.length > 140) {
      $('#error-message').text('Tweet exceeds 140 characters. Please shorten your tweet.').slideDown();
      return;
    }

    $('#error-message').slideUp();

    submitTweet(tweetText);

    $('#tweet-text').val('');
  });
  
  loadTweets();
  
});