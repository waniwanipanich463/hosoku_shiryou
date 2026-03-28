import fs from 'fs';
import https from 'https';
import path from 'path';

// 設定
const CHANNEL_ID = 'UC2VfIGmIV_2FSB7r0fIkbKg';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const SPREADSHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1YebegiKIdWJ8_t_P4B47uDQImyufWUZlFl19w3Xc_VU/export?format=csv&gid=0';
const TARGET_FILE = path.join(process.cwd(), 'main.js');
const START_DATE = new Date('2026-03-29');

// 汎用データ取得関数
function fetchData(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                // リダイレクト処理（Googleスプレッドシート等で発生）
                return fetchData(res.headers.location).then(resolve).catch(reject);
            }
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

// YouTube RSS の解析
function parseYouTubeRSS(xml) {
    const entries = [];
    const entryMatches = xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g);
    
    for (const match of entryMatches) {
        const entry = match[1];
        const id = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1];
        const title = entry.match(/<title>(.*?)<\/title>/)?.[1];
        const published = entry.match(/<published>(.*?)<\/published>/)?.[1];
        
        if (id && title && published) {
            const pubDate = new Date(published);
            if (pubDate >= START_DATE) {
                entries.push({
                    id,
                    title: title.trim(),
                    thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
                    description: "最新の動画内容についてはYouTubeでご確認ください。",
                    published: pubDate
                });
            }
        }
    }
    return entries;
}

// スプレッドシート CSV の解析
function parseSpreadsheetCSV(csv) {
    const lines = csv.split(/\r?\n/);
    const materialMap = new Map(); // Title -> DownloadURL
    
    // ヘッダーを飛ばして2行目から解析
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line) continue;
        
        // CSVのパース（シンプル版：カンマ区切り）
        // 実際にはクォート対応が必要な場合があるため、簡易的な正規表現を使用
        const columns = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        
        const title = columns[3]?.replace(/^"|"$/g, '').trim(); // D列: YouTubeタイトル
        const downloadUrl = columns[5]?.replace(/^"|"$/g, '').trim(); // F列: ダウンロードURL
        
        if (title && downloadUrl && downloadUrl.startsWith('http')) {
            materialMap.set(title, downloadUrl);
        }
    }
    return materialMap;
}

async function sync() {
    try {
        console.log('Fetching Data sources...');
        const [xml, csv] = await Promise.all([
            fetchData(RSS_URL),
            fetchData(SPREADSHEET_CSV_URL)
        ]);

        const youtubeVideos = parseYouTubeRSS(xml);
        const materialMap = parseSpreadsheetCSV(csv);
        
        console.log(`YouTube: Found ${youtubeVideos.length} videos since 2026/03/29.`);
        console.log(`Spreadsheet: Found ${materialMap.size} material links.`);

        const finalVideos = youtubeVideos.map(video => {
            // 1. スプレッドシートのURLを優先
            let downloadUrl = materialMap.get(video.title);
            
            // 2. スプレッドシートにない場合、ローカルの `downloads/` フォルダをチェック（期待されるパスをセット）
            if (!downloadUrl) {
                const localFilePath = `./downloads/${video.id}.pdf`;
                // 注: クライアントサイドでの存在確認はブラウザ側で行われるか、
                // あるいはここで存在を確認できるが、Viteのビルド後のパスを考慮して
                // デフォルト値をセットしておく。
                downloadUrl = localFilePath;
            }

            return {
                id: video.id,
                title: video.title,
                thumbnail: video.thumbnail,
                description: video.description,
                downloadUrl: downloadUrl // main.js側のロジックで "#" などの扱いは制御
            };
        });

        const videoDataString = `const videoData = ${JSON.stringify(finalVideos.sort((a, b) => b.published - a.published), (key, value) => {
            if (key === 'published') return undefined;
            return value;
        }, 4)};`;

        const content = fs.readFileSync(TARGET_FILE, 'utf8');
        const updatedContent = content.replace(/const videoData = \[[\s\S]*?\];/, videoDataString);
        
        fs.writeFileSync(TARGET_FILE, updatedContent);
        console.log('Successfully updated main.js with merged data.');
        
    } catch (error) {
        console.error('Error syncing:', error);
    }
}

sync();
