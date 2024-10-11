// http
import http from 'http';
import fs from 'fs';
import {fileURLToPath} from "url";
import path from "path";

//引入Llama.js
import {llama_chat} from "./node-llama-cpp.js";

//config
import config from "./config.json" with { type: "json"};

//建立歷史紀錄
let history = [];

// 使用 http.createServer() 方法建立 Web 伺服器，回傳一個 Server 實例
const server = http.createServer();

//取得底層資料夾位置
const __dirname = path.dirname(fileURLToPath(import.meta.url));

server.on('request', async (request, response) => {
    //POST? /send-message
    if (request.method === 'POST' && request.url === '/send-message') {
        //取得輸入的訊息
        let message = "";

        //如果監聽到請求,則進行處理
        request.on('data', (chunk) => {
            message += chunk.toString();
        });

        //監聽到請求結束
        request.on('end', async () => {
            //傳送至Llama
            const reply = await llama_chat(message, history);

            //回應訊息
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(reply);    

            //紀錄歷史
            history.push({
                role: 'user',
                text: message
            });

            history.push({
                role: 'model',
                response: [reply]
            });
        });

        return;
    }

    // GET? /history
    if (request.method === 'GET' && request.url === '/get-history') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(JSON.stringify({history: history}));

        return;
    }

    // GET? /delete-history
    if (request.method === 'GET' && request.url === '/delete-history') {
        //移除歷史紀錄
        history = [];

        //回應
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end("200");

        return;
    }

    // GET? /
    if (request.method === 'GET' && request.url === '/') {
        //如果監聽到請求，則進行處理
        console.log("取得到新請求!");

        // 讀取 HTML 檔案
        const filePath = path.join(__dirname, 'website' ,'index.html');
        const fileContent = fs.readFileSync(filePath);

        // 回傳 HTML 檔案
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(fileContent);

        return;
    }

    //other
    if (request.method === 'GET') {
        //拆分路徑
        const urlParts = request.url.split('/');

        // 讀取 CSS 檔案
        let filePath = path.join(__dirname, 'website');

        for (let i = 0; i < urlParts.length; i++) {
            filePath = path.join(filePath, urlParts[i]);
        }

        let fileContent = "";

        try {
            fileContent = fs.readFileSync(filePath);
        }catch{
            // 404
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end("404: Not Found.");

            return;
        }

        // 回傳 CSS 檔案
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.end(fileContent);

        return;
    }
});

// 綁定 port，啟動伺服器
server.listen(config.port, () => {
    console.log("伺服器已在 port " + config.port + " 運行 ...");
});