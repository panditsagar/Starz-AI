document.addEventListener('DOMContentLoaded', () => {
  const vslPlayer = document.getElementById('vslPlayer');
  const playBtn = document.getElementById('playBtn');
  const videoOverlay = document.getElementById('videoOverlay');
  const closeVideo = document.getElementById('closeVideo');
  const vslIframe = document.getElementById('vslIframe');
  const watchVslBtn = document.querySelector('a[href="#vslPlayer"]');

  // Video YouTube URL with autoplay
  const videoId = "dQw4w9WgXcQ";
  const autoplayUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
  const defaultUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;

  function openVideo() {
    if (videoOverlay) {
      videoOverlay.classList.add('active');
    }
    if (vslIframe) {
      vslIframe.src = autoplayUrl;
    }
  }

  function stopVideo() {
    if (videoOverlay) {
      videoOverlay.classList.remove('active');
    }
    if (vslIframe) {
      vslIframe.src = defaultUrl;
    }
  }

  if (watchVslBtn) {
    watchVslBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (vslPlayer) {
        vslPlayer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      openVideo();
    });
  }

  if (playBtn) {
    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openVideo();
    });
  }

  if (vslPlayer) {
    vslPlayer.addEventListener('click', () => {
      if (!videoOverlay || !videoOverlay.classList.contains('active')) {
        openVideo();
      }
    });
  }

  if (closeVideo) {
    closeVideo.addEventListener('click', (e) => {
      e.stopPropagation();
      stopVideo();
    });
  }
});