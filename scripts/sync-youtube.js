import fs from 'fs';
import https from 'https';
import http from 'http';
import path from 'path';

// 設定
const CHANNEL_ID = 'UC2VfIGmIV_2FSB7r0fIkbKg';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const SPREADSHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1YebegiKIdWJ8_t_P4B47uDQImyufWUZlFl19w3Xc_VU/export?format=csv&gid=0';
const TARGET_FILE = path.join(process.cwd(), 'main.js');
const START_DATE = new Date('2026-04-01');
const FETCH_TIMEOUT_MS = 30000; // 30秒タイムアウト

// 汎用データ取得関数（堅牢版）
function fetchData(url, redirectCount = 0) {
    if (redirectCount > 5) {
        return Promise.reject(new Error(`Too many redirects for URL: ${url}`));
    }

    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        
        const req = protocol.get(url, (res) => {
            const { statusCode } = res;

            // リダイレクト処理
            if (statusCode >= 300 && statusCode < 400 && res.headers.location) {
                res.resume(); // 未消費のレスポンスを破棄してメモリリークを防ぐ
                const nextUrl = new URL(res.headers.location, url).href;
                return fetchData(nextUrl, redirectCount + 1).then(resolve).catch(reject);
            }

            if (statusCode !== 200) {
                res.resume();
                return reject(new Error(`Fetch failed for URL: ${url}. Status Code: ${statusCode}`));
            }

            let data = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        });

        req.on('error', (err) => {
            reject(new Error(`Network error for URL: ${url}. Message: ${err.message}`));
        });

        // タイムアウト設定
        req.setTimeout(FETCH_TIMEOUT_MS, () => {
            req.destroy();
            reject(new Error(`Fetch timed out for URL: ${url} after ${FETCH_TIMEOUT_MS}ms`));
        });
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
    const materialList = []; // Array to handle duplicate/empty titles
    
    // ヘッダーを飛ばして2行目から解析
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line) continue;
        
        // CSVのパース（シンプル版：カンマ区切り）
        const columns = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        
        const publishedDateStr = columns[1]?.replace(/^"|"$/g, '').trim(); // B列: 公開日 (YYYY/MM/DD)
        const title = columns[3]?.replace(/^"|"$/g, '').trim(); // D列: YouTubeタイトル
        const downloadUrl = columns[5]?.replace(/^"|"$/g, '').trim(); // F列: ダウンロードURL
        
        if (downloadUrl && downloadUrl.startsWith('http')) {
            materialList.push({
                title: title || "",
                downloadUrl,
                publishedDate: publishedDateStr
            });
        }
    }
    return materialList;
}

async function sync() {
    try {
        console.log('Fetching Data sources...');
        const [xml, csv] = await Promise.all([
            fetchData(RSS_URL),
            fetchData(SPREADSHEET_CSV_URL)
        ]);

        const youtubeVideos = parseYouTubeRSS(xml);
        const materialList = parseSpreadsheetCSV(csv);
        
        console.log(`YouTube: Found ${youtubeVideos.length} videos since 2026/03/29.`);
        console.log(`Spreadsheet: Found ${materialList.length} material links.`);

        const finalVideos = youtubeVideos.map(video => {
            const d = new Date(video.published);
            const pubDateStr = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;

            // 1. タイトルでのマッチング試行（最優先）
            let sheetInfo = video.title ? materialList.find(m => m.title === video.title) : null;
            
            // 2. タイトルで一致しない場合、日付でのマッチングを試行（フォールバック）
            if (!sheetInfo) {
                sheetInfo = materialList.find(m => m.publishedDate === pubDateStr);
                if (sheetInfo) {
                    console.log(`Matching: Date matched for "${video.title}" (Date: ${pubDateStr})`);
                }
            }

            if (sheetInfo) {
                console.log(`Successfully matched potential material for: ${video.title}`);
            } else {
                console.log(`No material found for: ${video.title} (Date: ${pubDateStr})`);
            }

            return {
                id: video.id,
                title: video.title,
                thumbnail: video.thumbnail,
                description: video.description,
                downloadUrl: sheetInfo?.downloadUrl || "#",
                publishedDate: sheetInfo?.publishedDate || pubDateStr
            };
        });

        // 日付降順でソート
        finalVideos.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

        const videoDataString = `const videoData = ${JSON.stringify(finalVideos, null, 4)};`;

        const content = fs.readFileSync(TARGET_FILE, 'utf8');
        // $などの記号による置換不具合を防ぐため関数を使用
        const updatedContent = content.replace(/const videoData = \[[\s\S]*?\];/, () => videoDataString);
        
        fs.writeFileSync(TARGET_FILE, updatedContent);
        console.log('Successfully updated main.js with merged data.');
        
    } catch (error) {
        console.error('Error syncing:', error.message);
        process.exit(1);
    }
}

sync();
