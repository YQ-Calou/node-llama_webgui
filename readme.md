[English](readme_EN.md) | 繁體中文

# 新專案
node-llama_webui 已經被 [SimpleAPI-for-node-llama](https://github.com/YQ-Calou/simpleAPI-for-node-llama) 取代

# Llama cpp on Nodejs

使用 [node-llama-cpp](https://github.com/withcatai/node-llama-cpp) 依賴製作

依舊抱持著不踏入 python 的信念寫的

不是我不會 python

只是 nodejs 好用多了，到底哪個傻會用 python 架網頁的?

語法架構亂，運行效率也差。

還有那該死的語法不兼容問題

光 Debug 先花上半天時間

最後才發現到靠北說兼容 3.12 結果還是得用 3.11

誰愛寫誰寫

# 注意 !

Windows / Liunx 請先安裝 [Git](https://git-scm.com/)

# 基礎調試

我都調整好了，直接用

記得 `config.json` 裡的參數要調整

然後模型記得放在 `models` 資料夾裡

`website` 裡的 `fontawesome.zip` 記得解壓縮

沒調運行不了別怪我

# 執行

Windows 10/11 (已測環境)
```bat
start.bat
```

Liunx
```sh
chmod 777 .\start.sh
.\start.sh
```

搞定 !

# 開源

我開源，請自便。

如果要用這東西的話，下次請我喝一杯冷泡綠茶就好

THX~

# 對比
皆使用 `gemma 2b Q3` 推理，推理詞句為「身為一名人工智慧，請說明你能為這個世界帶來的五個好處」

結果如下
| 硬件 | 耗時(s) |
|-----|-----|
| RTX3070 Laptop | 2.411(s) |
| i7-11800H | 62.531(s) |
| i5-8250U | 210.012(s) |

唉，i5-8250U還是算了吧...

## 作者

Calou Zhou
