const videoData = [
    {
        "id": "O4I213UZYQY",
        "title": "【考察総集編】医療費14,000ドルでも長生きできないアメリカ!?米国医療システム破綻で国民に与える影響を考察します！",
        "thumbnail": "https://img.youtube.com/vi/O4I213UZYQY/maxresdefault.jpg",
        "description": "最新の動画内容についてはYouTubeでご確認ください。",
        "downloadUrl": "./downloads/O4I213UZYQY.pdf"
    }
];

function createVideoCard(video) {
    const card = document.createElement('article');
    card.className = 'card';
    
    // Fallback: If downloadUrl is not provided or just a placeholder, 
    // we can make it point to the YouTube video or disable it.
    const downloadLabel = video.downloadUrl && video.downloadUrl !== "#" ? "DOWNLOAD DATA" : "COMING SOON";
    const downloadClass = video.downloadUrl && video.downloadUrl !== "#" ? "download-btn" : "download-btn disabled";

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
                <a href="${video.downloadUrl}" class="${downloadClass}" ${video.downloadUrl === "#" ? "onclick='return false;'" : ""}>${downloadLabel}</a>
            </div>
        </div>
    `;
    
    return card;
}

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('video-grid');
    
    if (videoData.length === 0) {
        grid.innerHTML = '<p class="no-data">動画データを読み込んでいます...</p>';
    }

    videoData.forEach((video) => {
        const card = createVideoCard(video);
        grid.appendChild(card);
    });

    console.log('Cyberpunk Interface Initialized.');
});
