import fs from 'fs';
import https from 'https';
import path from 'path';

// 設定
const CHANNEL_ID = 'UC2VfIGmIV_2FSB7r0fIkbKg';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const SPREADSHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1YebegiKIdWJ8_t_P4B47uDQImyufWUZlFl19w3Xc_VU/export?format=csv&gid=0';
const TARGET_FILE = path.join(process.cwd(), 'main.js');
const START_DATE = new Date('2026-04-01');

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
    const materialMap = new Map(); // Title -> { downloadUrl, publishedDate }
    
    // ヘッダーを飛ばして2行目から解析
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line) continue;
        
        // CSVのパース（シンプル版：カンマ区切り）
        const columns = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        
        const publishedDateStr = columns[1]?.replace(/^"|"$/g, '').trim(); // B列: 公開日 (YYYY/MM/DD)
        const title = columns[3]?.replace(/^"|"$/g, '').trim(); // D列: YouTubeタイトル
        const downloadUrl = columns[5]?.replace(/^"|"$/g, '').trim(); // F列: ダウンロードURL
        
        if (title && downloadUrl && downloadUrl.startsWith('http')) {
            materialMap.set(title, {
                downloadUrl,
                publishedDate: publishedDateStr
            });
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
            // 1. スプレッドシートの情報を優先
            const sheetInfo = materialMap.get(video.title);
            let downloadUrl = sheetInfo?.downloadUrl;
            let publishedDate = sheetInfo?.publishedDate;
            
            // 2. スプレッドシートにない場合、YouTubeの公開日を使用し、URLは空に
            if (!publishedDate) {
                const d = new Date(video.published);
                publishedDate = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
            }

            if (!downloadUrl) {
                downloadUrl = "#";
            }

            return {
                id: video.id,
                title: video.title,
                thumbnail: video.thumbnail,
                description: video.description,
                downloadUrl: downloadUrl,
                publishedDate: publishedDate
            };
        });

        const videoDataString = `const videoData = ${JSON.stringify(finalVideos.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)), null, 4)};`;

        const content = fs.readFileSync(TARGET_FILE, 'utf8');
        const updatedContent = content.replace(/const videoData = \[[\s\S]*?\];/, videoDataString);
        
        fs.writeFileSync(TARGET_FILE, updatedContent);
        console.log('Successfully updated main.js with merged data.');
        
    } catch (error) {
        console.error('Error syncing:', error);
        process.exit(1);
    }
}

sync();
