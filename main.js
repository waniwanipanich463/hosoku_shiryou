const videoData = [
    {
        "id": "_emCx5X1bdI",
        "title": "【考察総集編】若者の借金危機!?それが今後どのような影響を与えるのか解説します！",
        "thumbnail": "https://img.youtube.com/vi/_emCx5X1bdI/maxresdefault.jpg",
        "description": "3/23～3/30まで過去動画で公開されなかったもの＋総集編を公開します！【考察総集編第2弾】若者の借金危機!?それが今後どのような影響を与えるのか考察しました",
        "downloadUrl": "./downloads/assets_100m.pdf"
    }
];

function createVideoCard(video) {
    const card = document.createElement('article');
    card.className = 'card';
    
    // 18時制限のチェック (検証用に一時的にtrue)
    const now = new Date();
    const currentHour = now.getHours();
    const isAfter18 = true;

    let downloadLabel = "COMING SOON";
    let downloadClass = "download-btn disabled";
    let isClickable = false;

    if (video.downloadUrl && video.downloadUrl !== "#") {
        if (isAfter18) {
            downloadLabel = "DOWNLOAD DATA";
            downloadClass = "download-btn";
            isClickable = true;
        } else {
            downloadLabel = "18:00 公開";
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
                   ${!isClickable ? "onclick='return false;'" : 'download="assets_100m.pdf"'}>
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
