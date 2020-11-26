// poster frame click event
$(document).on('click','.js-videoPoster',function(ev) {
    ev.preventDefault();
    var $poster = $(this);
    var $wrapper = $poster.closest('.js-videoWrapper');
    videoPlay($wrapper,$poster);
  });
  
  // play the targeted video (and hide the poster frame)
  function videoPlay($wrapper,$poster) {
    var $iframe = $wrapper.find('.js-videoIframe');
    var src = $iframe.data('src');
    // hide poster
    $poster.addClass('poster-out');
    // add iframe src in, starting the video
    $iframe.attr('src',src);
  }