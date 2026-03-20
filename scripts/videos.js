document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('videosContainer');
    
    if (!container) return;
    
    // Используем videosData из data.js
    if (typeof videosData === 'undefined' || !videosData.length) {
        container.innerHTML = '<div class="no-videos">Видео не найдены</div>';
        return;
    }
    
    container.innerHTML = '';
    
    videosData.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-item';
        
        videoCard.innerHTML = `
            <div class="video-wrapper">
                <iframe 
                    src="${video.youtubeUrl}"
                    title="${video.title}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <p class="video-description">${video.description}</p>
                <div class="video-meta">
                    <span class="video-date">${video.date}</span>
                </div>
            </div>
        `;
        
        container.appendChild(videoCard);
    });
});
