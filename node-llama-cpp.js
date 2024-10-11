//引入node llama cpp必要組件
import { fileURLToPath } from "url";
import path from "path";
import { getLlama, LlamaChatSession, Llama3ChatWrapper } from "node-llama-cpp";

//fs
import fs from 'fs';

//config
import config from "./config.json" with { type: "json" };

//取得底層資料夾位置
const __dirname = path.dirname(fileURLToPath(import.meta.url));
//模型名稱
const use_model = config.model;

//取得大模型gguf
const model_file = path.join(__dirname, "models", use_model);

//llama cpp
const llama = await getLlama();

llama.maxThreads = 0;

//讀取模型
let model = await llama.loadModel({
    modelPath: model_file
});
//創建聊天用窗口
let context = await model.createContext();
let session = new LlamaChatSession({
    contextSequence: context.getSequence(),
});

//系統提示詞
const model_systemPrompt = await fs.readFileSync("./data/system_prompt.txt", "utf8");

//取得訊息
async function llama_chat(input_message, input_history) {
    //設定計時器
    const Now_timer = Date.now();

    //生成種子
    const rnd_seed = () => {
        const max = Number.MAX_SAFE_INTEGER;
        return Math.floor(Math.random() * max);
    }

    //取得歷史訊息
    let new_history = process_history(input_history);

    //添加系統提示詞
    let new_message = `### System\n${model_systemPrompt}\n\n### User\n${input_message}\n\n### Assistant`;

    //組合訊息
    const new_message_format = new_history + new_message;

    //輸入訊息
    const reply = await session.prompt(new_message_format, {
        temperature: 1,
        topK: 40,
        topP: 0.95,
        seed: rnd_seed
    });

    //修正回應，避免結尾空格換行
    let new_reply = reply;
    new_reply = new_reply.trim();

    //計時器
    const timer = Date.now() - Now_timer;

    //輸出計時器結果
    console.log("輸入:" + input_message);
    console.log("輸出:" + new_reply);
    console.log("計時:" + timer + "ms");
    console.log("==============================");

    //回傳
    return new_reply;
}


function process_history(in_history) {
    //設定起手式
    const user_start = "### User\n";
    const assistant_start = "### Assistant\n";

    //設定新歷史紀錄
    let new_history = "";

    //設定歷史紀錄
    for(let i = 0; i < in_history.length; i+=2) {
        new_history += `${user_start}${in_history[i].text}\n${assistant_start}${in_history[i+1].response}\n`;
    }

    return new_history;
}

//匯出
export { llama_chat };