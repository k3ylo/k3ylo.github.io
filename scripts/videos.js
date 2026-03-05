const CHANNEL_ID = 'UC6hg0R9tbwu5TouvJYwDasw';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
document.addEventListener('DOMContentLoaded', async function() {
  const container = document.getElementById('videosContainer');
  
  try {
    const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(RSS_URL)}`);
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    const entries = xml.querySelectorAll('entry');
    if (entries.length === 0) {
      container.innerHTML = '<div class="no-data">No videos found on channel</div>';
      return;
    }
    
    const videosGrid = document.createElement('div');
    videosGrid.className = 'videos-grid';
    entries.forEach(entry => {
      const videoId = entry.querySelector('videoId')?.textContent;
      const title = entry.querySelector('title')?.textContent;
      const published = entry.querySelector('published')?.textContent;
      
      if (videoId && title) {
        const card = createVideoCard({
          id: videoId,
          title: title,
          youtube_url: `https://www.youtube.com/watch?v=${videoId}`,
          published: published
        });
        videosGrid.appendChild(card);
      }
    });
    
    container.innerHTML = '';
    container.appendChild(videosGrid);
    
  } catch (error) {
    console.error('Failed to load videos:', error);
    container.innerHTML = '<div class="no-data">Failed to load videos from YouTube. Please try again later.</div>';
  }
});

function createVideoCard(video) {
  const card = document.createElement('div');
  card.className = 'video-card';
  const thumbnail = document.createElement('div');
  thumbnail.className = 'video-thumbnail';
  thumbnail.style.backgroundImage = `url(https://i.ytimg.com/vi/${video.id}/hqdefault.jpg)`;
  thumbnail.style.backgroundSize = 'cover';
  thumbnail.style.backgroundPosition = 'center';
  
  const playOverlay = document.createElement('div');
  playOverlay.className = 'play-overlay';
  playOverlay.innerHTML = '▶';
  playOverlay.onclick = function() {
    thumbnail.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.id}?autoplay=1`;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    thumbnail.appendChild(iframe);
  };
  
  thumbnail.appendChild(playOverlay);
  
  const info = document.createElement('div');
  info.className = 'video-info';
  const title = document.createElement('p');
  title.className = 'video-title';
  title.textContent = 'title: ' + (video.title || 'Untitled');
  
  const date = document.createElement('p');
  date.className = 'video-time';
  if (video.published) {
    const publishDate = new Date(video.published);
    date.textContent = 'published: ' + publishDate.toLocaleDateString('ru-RU');
  } else {
    date.textContent = 'published: N/A';
  }
  
  info.appendChild(title);
  info.appendChild(date);
  const actions = document.createElement('div');
  actions.className = 'video-actions';
  const watchBtn = document.createElement('button');
  watchBtn.className = 'video-action-btn';
  watchBtn.textContent = 'watch on youtube';
  watchBtn.onclick = function() {
    window.open(video.youtube_url, '_blank');
  };
  
  actions.appendChild(watchBtn);
  card.appendChild(thumbnail);
  card.appendChild(info);
  card.appendChild(actions);
  return card;
}
