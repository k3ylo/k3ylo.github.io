document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('videosContainer');
    
    if (!container) return;
    
    if (typeof videosData === 'undefined' || !videosData.length) {
        container.innerHTML = '<div class="no-data">Видео не найдены</div>';
        return;
    }
    
    container.innerHTML = '';
    
    const grid = document.createElement('div');
    grid.className = 'videos-grid';
    
    videosData.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        
        const hasDownload = video.downloadUrl && video.downloadUrl !== '';
        
        let actionsHtml = '';
        if (hasDownload) {
            actionsHtml = `
                <div class="video-actions">
                    <a href="${video.downloadUrl}" class="video-action-btn" download target="_blank">
                        download
                    </a>
                </div>
            `;
        }
        
        card.innerHTML = `
            <div class="video-thumbnail">
                <iframe 
                    src="${video.youtubeUrl}?autoplay=0&modestbranding=1"
                    title="${video.title}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
            <div class="video-info">
                <div class="video-name">
                    <span class="info-label">name:</span>
                    <span class="info-value">${video.title}</span>
                </div>
                <div class="video-date">
                    <span class="info-label">date uploaded:</span>
                    <span class="info-value">${video.date || 'unknown'}</span>
                </div>
                ${video.description ? `
                <div class="video-desc">
                    <span class="info-label">description:</span>
                    <span class="info-value">${video.description}</span>
                </div>
                ` : ''}
            </div>
            ${actionsHtml}
        `;
        
        grid.appendChild(card);
    });
    
    container.appendChild(grid);
});
