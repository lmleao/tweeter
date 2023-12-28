/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  //Section: Helper functions
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const formatTimestamp = (timestamp) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return timeago.format(timestamp, 'en_US', options);
  };
  
  //Section: Rendering Tweets
  const createTweetElement = function(tweet) {
    if (!tweet || !tweet.user) {
      console.error('Invalid tweet data:', tweet);
      return null;
    }
  
    const user = tweet.user;
  
    if (!user.avatars || !user.name || !user.handle) {
      console.error('Invalid user data:', user);
      return null;
    }
    
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
  
    return $tweet;
  };
  
  const renderTweets = function(tweets) {
    const $tweetsContainer = $('#tweets-container');
  
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    });
  };

  //Section: Handling Ajax requests
  const loadTweets = function() {
    const deferred = $.Deferred();

    $.ajax({
      method: 'GET',
      url: '/tweets'
    })
      .done(function(response) {
        deferred.resolve(response);
      })
      .fail(function(error) {
        console.error('Error loading tweets:', error);
        deferred.reject(error);
      });
    return deferred.promise();
    
  };

  const submitTweet = function(tweetData) {
    return $.ajax({
      method: 'POST',
      url: '/tweets',
      data: tweetData
    });
  };

  const loadAndRenderTweets = function() {
    loadTweets()
      .then(function(response) {
        const $tweetsContainer = $('#tweets-container');
        $tweetsContainer.empty();

        renderTweets(response);
        
        $('#tweet-text').val('');
        $('.counter').text('140').removeClass('counter-exceeded');
      })
      .fail(function(error) {
        console.error('Error loading tweets:', error);
      });
  };

  //Section: Event Handlers
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

    submitTweet($(this).serialize())
      .then(function() {
        loadAndRenderTweets();
      })
      .fail(function(error) {
        console.error('Error submitting tweet:', error);
      });
  });
  
  //Section: Initial load
  loadAndRenderTweets();

});