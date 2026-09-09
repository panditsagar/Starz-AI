document.addEventListener('DOMContentLoaded', () => {
  const vslPlayer = document.getElementById('vslPlayer');
  const playBtn = document.getElementById('playBtn');
  const videoOverlay = document.getElementById('videoOverlay');
  const closeVideo = document.getElementById('closeVideo');
  const vslIframe = document.getElementById('vslIframe');
  const watchVslBtn = document.querySelector('a[href="#vslPlayer"]');

  function getYouTubeVideoId(url) {
    if (!url) {
      return '';
    }

    try {
      const parsedUrl = new URL(url, window.location.href);
      const hostname = parsedUrl.hostname.replace(/^www\./, '');

      if (hostname === 'youtu.be') {
        return parsedUrl.pathname.split('/').filter(Boolean)[0] || '';
      }

      if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
        if (parsedUrl.pathname === '/watch') {
          return parsedUrl.searchParams.get('v') || '';
        }

        const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
        if (['embed', 'shorts', 'live'].includes(pathParts[0])) {
          return pathParts[1] || '';
        }
      }
    } catch (error) {
      const match = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/|live\/)([a-zA-Z0-9_-]{11})/);
      return match ? match[1] : '';
    }

    return '';
  }

  function getYouTubeEmbedUrl(videoId, { autoplay = false } = {}) {
    const params = new URLSearchParams({
      enablejsapi: '1',
      rel: '0',
    });

    if (autoplay) {
      params.set('autoplay', '1');
    }

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  }

  const videoUrl = vslIframe?.dataset.youtubeUrl || vslIframe?.src || '';
  const videoId = getYouTubeVideoId(videoUrl);
  const defaultUrl = videoId ? getYouTubeEmbedUrl(videoId) : '';
  const autoplayUrl = videoId ? getYouTubeEmbedUrl(videoId, { autoplay: true }) : '';

  if (vslIframe && defaultUrl) {
    vslIframe.src = defaultUrl;
  }

  function openVideo() {
    if (videoOverlay) {
      videoOverlay.classList.add('active');
    }
    if (vslIframe && autoplayUrl) {
      vslIframe.src = autoplayUrl;
    }
  }

  function stopVideo() {
    if (videoOverlay) {
      videoOverlay.classList.remove('active');
    }
    if (vslIframe && defaultUrl) {
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

  // Interactive Split Showcase Tab Switcher
  const showcaseTabs = document.querySelectorAll('.showcase-tab');
  const showcasePanels = document.querySelectorAll('.showcase-panel');

  if (showcaseTabs.length && showcasePanels.length) {
    showcaseTabs.forEach((tab) => {
      function activateTab() {
        const targetId = tab.dataset.tab;

        showcaseTabs.forEach((t) => t.classList.remove('active'));
        showcasePanels.forEach((p) => p.classList.remove('active'));

        tab.classList.add('active');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      }

      tab.addEventListener('click', activateTab);
      tab.addEventListener('mouseenter', activateTab);
    });
  }
});
