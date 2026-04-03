const videoData = [];

function createVideoCard(video) {
    const card = document.createElement('article');
    card.className = 'card';
    
    let downloadLabel = "COMING SOON";
    let downloadClass = "download-btn disabled";
    let isClickable = false;

    if (video.downloadUrl && video.downloadUrl !== "#") {
        downloadLabel = "DOWNLOAD DATA";
        downloadClass = "download-btn";
        isClickable = true;
    }

    card.innerHTML = `
        <div class="thumbnail-wrapper">
            <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank">
                <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
                <div class="play-overlay"><span class="play-icon">▶</span></div>
            </a>
        </div>
        <div class="card-content">
            <h3>${video.title}</h3>
            <p>${video.description}</p>
            <div class="btn-group">
                <a href="${isClickable ? video.downloadUrl : '#'}" 
                   class="${downloadClass}" 
                   ${!isClickable ? "onclick='return false;'" : "download"}>
                   ${downloadLabel}
                </a>
            </div>
        </div>
    `;
    
    return card;
}

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('video-grid');
    
    if (videoData.length === 0) {
        grid.innerHTML = '<p class="no-data">COMING SOON...</p>';
    }

    videoData.forEach((video) => {
        const card = createVideoCard(video);
        grid.appendChild(card);
    });

    console.log('Cyberpunk Interface Initialized.');
});
