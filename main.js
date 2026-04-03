const videoData = [
    {
        "id": "0wIXfCqqQLA",
        "title": "金価格高騰の裏側!?金が高いのではなく日本円の価値が崩壊している実態について紹介します！",
        "thumbnail": "https://img.youtube.com/vi/0wIXfCqqQLA/maxresdefault.jpg",
        "description": "最新の動画内容についてはYouTubeでご確認ください。",
        "downloadUrl": "#",
        "publishedDate": "2026/04/03"
    },
    {
        "id": "5oCl_wADe7E",
        "title": "イン���レと円安!?更に社会保険料増により今後の日本でどう生き残るか紹介します！",
        "thumbnail": "https://img.youtube.com/vi/5oCl_wADe7E/maxresdefault.jpg",
        "description": "最新の動画内容についてはYouTubeでご確認ください。",
        "downloadUrl": "#",
        "publishedDate": "2026/04/02"
    },
    {
        "id": "QqAHinC-VAE",
        "title": "日本低迷の今後はこうなる!?インフレと円安でどう生き抜くか紹介します！",
        "thumbnail": "https://img.youtube.com/vi/QqAHinC-VAE/maxresdefault.jpg",
        "description": "最新の動画内容についてはYouTubeでご確認ください。",
        "downloadUrl": "#",
        "publishedDate": "2026/04/01"
    }
];

function createVideoCard(video) {
    const card = document.createElement('article');
    card.className = 'card';
    
    const label = "DOWNLOAD DATA";
    const btnClass = "download-btn";
    const fallbackUrl = "https://tumugi-lp.vercel.app";
    const finalUrl = (video.downloadUrl && video.downloadUrl !== "#") ? video.downloadUrl : fallbackUrl;

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
                <a href="${finalUrl}" 
                   class="${btnClass}" 
                   target="_blank"
                   rel="noopener noreferrer">
                   ${label}
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
