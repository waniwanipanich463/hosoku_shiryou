const videoData = [];

function createVideoCard(video) {
    const card = document.createElement('article');
    card.className = 'card';
    
    // 18時制限のチェック
    const now = new Date();
    
    // 公開日の取得（YYYY/MM/DD形式を想定）
    const pubDateParts = video.publishedDate.split('/');
    const releaseDate = new Date(pubDateParts[0], pubDateParts[1] - 1, pubDateParts[2], 18, 0, 0);
    
    const isReleased = now >= releaseDate; 

    let downloadLabel = "COMING SOON";
    let downloadClass = "download-btn disabled";
    let isClickable = false;

    if (video.downloadUrl && video.downloadUrl !== "#") {
        if (isReleased) {
            downloadLabel = "DOWNLOAD DATA";
            downloadClass = "download-btn";
            isClickable = true;
        } else {
            downloadLabel = "本日 18:00 公開";
            downloadClass = "download-btn disabled delay";
        }
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
        grid.innerHTML = '<p class="no-data">動画データを読み込んでいます...</p>';
    }

    videoData.forEach((video) => {
        const card = createVideoCard(video);
        grid.appendChild(card);
    });

    console.log('Cyberpunk Interface Initialized.');
});
