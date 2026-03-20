document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('videosContainer');
    
    if (!container) return;
    
    if (typeof videosData === 'undefined' || !videosData.length) {
        container.innerHTML = '<div class="no-data">Видео не найдены</div>';
        return;
    }
    
    // Используем твою структуру с videos-grid
    container.innerHTML = `
        <div class="videos-grid">
            ${videosData.map(video => `
                <div class="video-card">
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
                        <h3 class="video-title">${video.title}</h3>
                        ${video.date ? `<p class="video-time">📅 ${video.date}</p>` : ''}
                        ${video.description ? `<p class="video-quality">${video.description}</p>` : ''}
                    </div>
                    ${video.downloadUrl ? `
                        <div class="video-actions">
                            <a href="${video.downloadUrl}" class="video-download-btn" download target="_blank">
                                download
                            </a>
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>
    `;
});
