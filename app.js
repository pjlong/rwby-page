  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var player = {};
function onYouTubeIframeAPIReady() {
  $('.player').each(function () {
    player[$(this).attr('id')] = new YT.Player(
      $(this).attr('id'), {
        height: videoHeight,
        width: videoWidth,
        videoId: $(this).data('videoId'),
        playerVars: {
          controls: 0,
          enablejsapi: 1,
          modestbranding: 0,
          rel: 0,
          showinfo: 0,
          start: 200
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      }
    );
  });
};

function onPlayerReady(event) {
  //player['white-player'].playVideo();
  //event.target.playVideo();
  //setTimeout(removePlayer, 2000);
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
    $(event.target.d)
      .parents('.panel')
      .removeClass('active');
  }

  if (event.data == YT.PlayerState.PLAYING) {
  } 
}


var videoWidth = 640;
var videoHeight = 360;


$(document).on('click', '.panel', function (e) {
  var $panel = $(this);

  if ($('.panel.active').length > 0) {
    $panel = $('.panel.active');
    var curPlayer = player[$panel.find('.player').attr('id')];
    
    if (curPlayer.getPlayerState() == YT.PlayerState.PLAYING) {
      curPlayer.pauseVideo();
    }
  } else {
    var curPlayer = player[$(this).find('.player').attr('id')];
    curPlayer.playVideo();
    $panel.toggleClass('active');
  }
});