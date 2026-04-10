const videoData = [
    {
        "id": "QHgelc032j8",
        "title": "アメリカと中国!?壮大な国家間競争の背景について紹介します！",
        "thumbnail": "https://img.youtube.com/vi/QHgelc032j8/maxresdefault.jpg",
        "description": "最新の動画内容についてはYouTubeでご確認ください。",
        "downloadUrl": "https://acrobat.adobe.com/id/urn:aaid:sc:AP:2ecef62c-e6c7-49c3-be43-44201bfef3df",
        "publishedDate": "2026/04/10"
    },
    {
        "id": "LzopubzzXjA",
        "title": "二大巨頭の警鐘!?資産家の強烈な警告の裏にある真意について紹介します！",
        "thumbnail": "https://img.youtube.com/vi/LzopubzzXjA/maxresdefault.jpg",
        "description": "最新の動画内容についてはYouTubeでご確認ください。",
        "downloadUrl": "https://acrobat.adobe.com/id/urn:aaid:sc:AP:fea19872-d01f-46a0-a5b3-d96d63159cf9",
        "publishedDate": "2026/04/09"
    },
    {
        "id": "A5Qdq3CMtWc",
        "title": "弱肉強食のディールの時代!?自由貿易の終焉と新たな戦場について紹介します！",
        "thumbnail": "https://img.youtube.com/vi/A5Qdq3CMtWc/maxresdefault.jpg",
        "description": "最新の動画内容についてはYouTubeでご確認ください。",
        "downloadUrl": "https://acrobat.adobe.com/id/urn:aaid:sc:AP:3f3af979-75d3-433a-bd37-27cf18e7e1ab",
        "publishedDate": "2026/04/08"
    },
    {
        "id": "A6TEzPAZL3k",
        "title": "通貨帝国アメリカの崩壊!?超大富豪達は●●をする理由を紹介します！",
        "thumbnail": "https://img.youtube.com/vi/A6TEzPAZL3k/maxresdefault.jpg",
        "description": "最新の動画内容についてはYouTubeでご確認ください。",
        "downloadUrl": "https://acrobat.adobe.com/id/urn:aaid:sc:AP:4f47947a-8ffd-4efa-8132-a74406c8cdc1",
        "publishedDate": "2026/04/07"
    },
    {
        "id": "BgBz4hDXBNw",
        "title": "2026年4月!?日米の株価上昇する理由について紹介します！",
        "thumbnail": "https://img.youtube.com/vi/BgBz4hDXBNw/maxresdefault.jpg",
        "description": "最新の動画内容についてはYouTubeでご確認ください。",
        "downloadUrl": "https://acrobat.adobe.com/id/urn:aaid:sc:AP:cd333a79-a9bb-4474-9e0a-2061b8eec0dc",
        "publishedDate": "2026/04/06"
    },
    {
        "id": "hoPVcuHzmrc",
        "title": "緊迫した中東戦争!?世界的な供給ショックとインフレの正体について紹介します！",
        "thumbnail": "https://img.youtube.com/vi/hoPVcuHzmrc/maxresdefault.jpg",
        "description": "最新の動画内容についてはYouTubeでご確認ください。",
        "downloadUrl": "https://acrobat.adobe.com/id/urn:aaid:sc:AP:c071d4c1-283d-402b-94ee-271af9916cdc",
        "publishedDate": "2026/04/05"
    },
    {
        "id": "TmzSvhCD-gQ",
        "title": "日本の不動産市場に大打撃!?中国人富裕層が日本の不動産を大量売却している裏側について紹介！",
        "thumbnail": "https://img.youtube.com/vi/TmzSvhCD-gQ/maxresdefault.jpg",
        "description": "最新の動画内容についてはYouTubeでご確認ください。",
        "downloadUrl": "https://acrobat.adobe.com/id/urn:aaid:sc:AP:09f2a899-98e1-4b1f-979c-7bf69b9d42a8",
        "publishedDate": "2026/04/04"
    },
    {
        "id": "0wIXfCqqQLA",
        "title": "金価格高騰の裏側!?金が高いのではなく日本円の価値が崩壊している実態について紹介します！",
        "thumbnail": "https://img.youtube.com/vi/0wIXfCqqQLA/maxresdefault.jpg",
        "description": "最新の動画内容についてはYouTubeでご確認ください。",
        "downloadUrl": "https://acrobat.adobe.com/id/urn:aaid:sc:AP:e2e864c8-8f3c-432f-8695-2537ee19cfbe",
        "publishedDate": "2026/04/03"
    },
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
    const searchInput = document.getElementById('search-input');
    
    function renderVideos(filterTerm = '') {
        grid.innerHTML = '';
        const filteredData = videoData.filter(video => 
            video.title.toLowerCase().includes(filterTerm.toLowerCase())
        );

        if (filteredData.length === 0) {
            grid.innerHTML = `<p class="no-data">NO RESULTS FOUND FOR "${filterTerm}"</p>`;
            return;
        }

        filteredData.forEach((video) => {
            const card = createVideoCard(video);
            grid.appendChild(card);
        });
    }

    if (videoData.length === 0) {
        grid.innerHTML = '<p class="no-data">COMING SOON...</p>';
    } else {
        renderVideos();
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderVideos(e.target.value);
        });
    }

    console.log('Cyberpunk Interface Initialized.');
});
