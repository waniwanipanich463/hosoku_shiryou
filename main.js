const videoData = [
    {
        "id": "5oCl_wADe7E",
        "title": "インフレと円安!?更に社会保険料増により今後の日本でどう生き残るか紹介します！",
        "thumbnail": "https://img.youtube.com/vi/5oCl_wADe7E/maxresdefault.jpg",
        "description": "最新の動画内容についてはYouTubeでご確認ください。",
        "downloadUrl": "https://acrobat.adobe.com/id/urn:aaid:sc:AP:991ee9b7-7566-418d-86ce-6ae6bd63f206",
        "publishedDate": "2026/04/02"
    },
    {
        "id": "QqAHinC-VAE",
        "title": "日本低迷の今後はこうなる!?インフレと円安でどう生き抜くか紹介します！",
        "thumbnail": "https://img.youtube.com/vi/QqAHinC-VAE/maxresdefault.jpg",
        "description": "最新の動画内容についてはYouTubeでご確認ください。",
        "downloadUrl": "https://acrobat.adobe.com/id/urn:aaid:sc:AP:791e9b37-017c-47bc-96bc-b5b00606014d",
        "publishedDate": "2026/04/01"
    }
];

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
