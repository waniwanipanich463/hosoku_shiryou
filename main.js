const videoData = [
    {
        id: "_emCx5X1bdI",
        title: "【考察総集編】若者の借金危機!?それが今後どのような影響を与えるのか解説します！",
        thumbnail: "https://img.youtube.com/vi/_emCx5X1bdI/maxresdefault.jpg",
        description: "3/23～3/30まで過去動画で公開されなかったもの＋総集編を公開します！【考察総集編第2弾】若者の借金危機!?それが今後どのような影響を与えるのか考察しました",
        downloadUrl: "./downloads/_emCx5X1bdI.pdf"
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
