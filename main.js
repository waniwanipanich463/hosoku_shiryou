const videoData = [
    {
        "id": "cnTFi9G64BM",
        "title": "【考察総集編】アメリカで何が起きた!?スタバ閉店の連鎖で米国経済完全終了",
        "thumbnail": "https://img.youtube.com/vi/cnTFi9G64BM/maxresdefault.jpg",
        "description": "最新の動画内容についてはYouTubeでご確認ください。",
        "downloadUrl": "https://acrobat.adobe.com/id/urn:aaid:sc:AP:343f27d1-295a-4c36-a925-b05516d38224"
    },
    {
        "id": "O4I213UZYQY",
        "title": "【考察総集編】医療費14,000ドルでも長生きできないアメリカ!?米国医療システム破綻で国民に与える影響を考察します！",
        "thumbnail": "https://img.youtube.com/vi/O4I213UZYQY/maxresdefault.jpg",
        "description": "最新の動画内容についてはYouTubeでご確認ください。",
        "downloadUrl": "https://acrobat.adobe.com/id/urn:aaid:sc:AP:343f27d1-295a-4c36-a925-b05516d38224"
    }
];

function createVideoCard(video) {
    const card = document.createElement('article');
    card.className = 'card';
    
    // 18時制限のチェック (【検証用】一時的に常にtrueにしてデプロイします)
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
