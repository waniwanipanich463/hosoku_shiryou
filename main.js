const videoData = [
    {
        title: "欧州の福祉崩壊！日本が直面する財政危機の回避術について紹介します！",
        thumbnail: "https://img.youtube.com/vi/lZFlSyWsPdA/maxresdefault.jpg",
        description: "欧州諸国の経済状況を参考に、日本が直面する可能性のある未来と具体的な回避策について深掘りします。",
        downloadUrl: "#"
    },
    {
        title: "年収1500万でもカツカツ！2026年ＮＹのリアルな家計実態",
        thumbnail: "https://img.youtube.com/vi/am_0WoQU7bI/maxresdefault.jpg",
        description: "過酷な物価高に見舞われるニューヨークの最新生活実態と、高所得層でも避けられない家計の苦境をレポート。",
        downloadUrl: "#"
    },
    {
        title: "【超大増税時代】これまでの投資の常識は変わります！今からこれで対策をして下さい！",
        thumbnail: "https://img.youtube.com/vi/iBIW0DRxYtY/maxresdefault.jpg",
        description: "迫りくる増税時代に向けた新しい投資ポートフォリオの考え方と、個人が今すぐ始めるべき防衛策を解説。",
        downloadUrl: "#"
    },
    {
        title: "フォートノックス 金の在庫はゼロ？米ドル崩壊とゴールド新時代の衝撃の真実",
        thumbnail: "https://img.youtube.com/vi/B8WGcRzL-qU/maxresdefault.jpg",
        description: "金準備を巡る裏側とドルの信認、そして資産防衛におけるゴールドの真の価値について衝撃の事実に迫ります。",
        downloadUrl: "#"
    },
    {
        title: "【2026年の予言】日本が「豊かな国」から「足りない国」へ…物価高の正体とバフェットが日本株を買う理由",
        thumbnail: "https://img.youtube.com/vi/b54yuwrgI1c/maxresdefault.jpg",
        description: "日本経済の構造的変化と、世界的投資家が日本市場を高く評価する背景、そして私たちが備えるべき未来像。",
        downloadUrl: "#"
    }
];

function createVideoCard(video) {
    const card = document.createElement('article');
    card.className = 'card';
    
    card.innerHTML = `
        <div class="thumbnail-wrapper">
            <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
        </div>
        <div class="card-content">
            <h3>${video.title}</h3>
            <p>${video.description}</p>
            <a href="${video.downloadUrl}" class="download-btn">DOWNLOAD DATA</a>
        </div>
    `;
    
    return card;
}

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('video-grid');
    
    videoData.forEach((video, index) => {
        const card = createVideoCard(video);
        // Add a slight delay for staggered entrance effect if desired
        grid.appendChild(card);
    });

    console.log('Cyberpunk Interface Initialized.');
});
