/* eslint-disable no-undef */
$(document).ready(function() {
  const tweetText = $('#tweet-text');
  const counter = tweetText.closest('.new-tweet').find('.counter');
  counter.text(140);

  tweetText.on('input', function() {
    // Update the character count
    const remainingChars = 140 - tweetText.val().length;
    counter.text(remainingChars);


    if (remainingChars < 0) {
      counter.addClass('counter-exceeded');
    } else {
      counter.removeClass('counter-exceeded');
    }
  });
});