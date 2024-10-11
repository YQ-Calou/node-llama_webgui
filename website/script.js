let sending = false;
async function sendMessage(){
    //如果正在發送，則禁止重複發送
    if(sending) return;

    //設置為正在發送
    sending = true;

    //取得輸入的訊息
    const message = document.getElementById("input").value;

    //將其清空
    document.getElementById("input").value = "";

    //建立timer
    const Now_timer = Date.now();

    //修正，正在輸出訊息
    const show_timer = setInterval(() => {
        document.getElementById("warn_text").innerHTML = "機器人正在產生訊息... / " + (Date.now() - Now_timer) + "ms";
    },1);

    //發送訊息
    const send_request = await fetch("/send-message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: message
    });

    //取得回應
    getHistory();

    //設置為已發送
    sending = false;

    //清除timer
    clearInterval(show_timer);

    //修正
    document.getElementById("warn_text").innerHTML = "請勿提供任何個人資料。Calou-GPT可能會隨時提供錯誤資訊，資訊來源並不可靠，請核實重要資訊。(上一個回應 : " + (Date.now() - Now_timer) + "ms)";
}

async function getHistory(){
    //發送請求
    const history_request = await fetch("/get-history");

    //取得回應
    let history = await history_request.text();
    
    //將回應轉換為JSON
    let history_JSON = JSON.parse(history).history;

    //清空畫面
    const chat_container = document.querySelector(".chat_container");
    chat_container.innerHTML = "";
    
    //逐一處理回應
    for(let i = 0; i < history_JSON.length; i+=2){
        //添加html物件
        const block = document.createElement("div");
        block.classList.add("chat_block");

        //將換行轉為<br>
        let HTML_response = await history_JSON[i+1].response[0].replaceAll(/\n/g, "<br>");

        block.innerHTML = `
            <div class="user">${history_JSON[i].text}</div>
            <div class="model">${HTML_response}</div>
        `;

        //添加到畫面
        const chat_container = document.querySelector(".chat_container");
        chat_container.appendChild(block);
    }
}

async function deleteMessage(){
    //發送請求
    await fetch("/delete-history");

    //取得歷史紀錄
    getHistory();
}

onload = () => {
    getHistory();
}