# 解釋影片的細節

[English](video.md)

`am video` 的完整行為。首頁只列了最常用的幾條。

`am video` 做了這些事：

- **逐步建構**：第 N 句旁白播出時，圖上出現第 N 步，箭頭會一筆畫出來。旁白比步數多時，多出的前幾句當開場白。
- **口語旁白**：旁白是要念出來的，Agent 會寫成當面講解的口吻，而不是說明書腔。
- **鏡頭聚焦**：旁白裡寫 `[Server]`，鏡頭推向這個節點並高亮。整張圖始終留在畫面裡，不會被裁掉。
- **跨場景變形**：下一個場景裡同名的節點，會從舊位置平滑移到新位置，而不是硬切。
- **配音**：設定了 `ELEVENLABS_API_KEY` 就用 ElevenLabs（可選，[組態指南](elevenlabs.zh-TW.md)），否則用系統語音，都沒有就只出字幕。系統語音按每句旁白的語言在本機已裝的語音裡挑：macOS `say` 用這門語言已裝的語音，繁體中文優先用台灣語音（`zh_TW`）；Linux 用 espeak-ng 對應的語音。某句的語言本機沒有裝語音時，這句只保留字幕不配音，執行時期會說明是哪種語言——絕不會用別的語言的語音去唸。每一拍的時長等於這句音訊的長度，所以音畫同步。
- **本機配音**：`--voice local` 呼叫你自己部署的 OpenAI 相容 `POST /v1/audio/speech` 服務，要求返回 16 位 PCM WAV，比如用 [mlx-audio](https://github.com/Blaizzy/mlx-audio) 執行 Qwen3-TTS，或者用 [Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI)。`AM_TTS_URL` 填服務根地址；服務沒有預設值時還要設 `AM_TTS_MODEL` 和 `AM_TTS_VOICE`，服務要求密鑰時設 `AM_TTS_API_KEY`。`AM_TTS_EXTRA` 是模型專用參數（JSON 物件），併入每個請求；`AM_TTS_MODEL`、`AM_TTS_VOICE` 覆蓋其中的同名欄位，`input`、`response_format`、`stream` 總由 `am` 決定。某句音訊比文字應有的時長短得多或長得多時，重新生成，每句最多 `AM_TTS_ATTEMPTS` 次（預設 3，設為 1 關閉檢查）。`am patch` 沿用影片原來的配音方式。例：`AM_TTS_URL=http://127.0.0.1:8000 AM_TTS_MODEL=mlx-community/Qwen3-TTS-12Hz-1.7B-CustomVoice-4bit AM_TTS_VOICE=vivian am video draft.md --voice local`。Kokoro 先執行 `docker run -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-cpu:latest`，再執行 `AM_TTS_URL=http://127.0.0.1:8880 AM_TTS_MODEL=kokoro AM_TTS_VOICE=af_bella am video draft.md --voice local`。
- **音訊對應**：`--audio-map lines.json` 從 JSON 物件讀取已有音訊，鍵是旁白，值是音訊檔案，例如 `{"客戶端先發送 SYN。":"audio/01.mp3"}`。相對路徑以對應檔案所在目錄為起點。匹配時會去掉一個開頭的 `> ` 旁白標記和 `[ ]` 標記，併合並多餘空白。旁白缺少對應的鍵或音訊檔案不存在時，渲染會停止並指出問題。音訊與 `--voice local` 走同一套首尾靜音裁剪、純靜音中止和語音快取流程；快取鍵包含對應檔案以及每個音訊檔案的大小、修改時間和 SHA-256 內容哈希，音訊變化後會重新讀取。多聲道 16 位 PCM WAV 會混成單聲道；其他編碼的 WAV 和非 WAV 音訊用 ffmpeg 轉換，沒有 ffmpeg 時會給出清楚的錯誤。`--audio-map` 不能和明確的 `--voice` 一起使用；給出對應時會忽略組態的預設配音。用 `am patch` 修改這種影片時，要再次傳入對應，或用 `--voice` 選擇另一種配音。
- **和頁面同一套外觀**：預設是 blueprint 圖紙風，帶刻度外框和字母編號的圖紙標題欄。稿件裡寫 `theme: 3b1b` 換成深色的 3Blue1Brown 風格；也支援 `theme: shadcn` 和 `mode: dark`。
- **章節與倍速**：控制條上方有一條章節欄，每個場景一個標記，當前章節高亮，點一下跳到那一幕並繼續播放；進度條上的刻度也能點。倍速按鈕在 0.5× 到 2× 之間循環，旁白和畫面一起變快。
- **單個檔案**：音訊內嵌在頁面裡，離線也能播。播放器帶一個匯出按鈕（⤓）：同一個影片由瀏覽器自己編碼並下載，不用終端、不用 ffmpeg，按鈕上顯示進度，點遮罩可停止。它需要安全上下文（本機檔案或 `localhost`）—— 走普通 HTTP 的頁面拿不到 WebCodecs。加 `--mp4` 在頁面旁邊另存 1080p 的 MP4（H.264 + AAC），需要 ffmpeg，匯出時間約為影片時長的 1.3 倍。加 `--webm` 另存同一個影片的 WebM（VP9 + Opus），由頁面自己編碼，不需要 ffmpeg，耗時取決於頁面動的多少：本機實測 11 秒稿 28 秒、2:27 五幕片 13.5 分鐘（筆記本電腦 CPU、1080p30）。兩者都需要 Chrome 和 Node.js 22+，可以同時加。

範例影片（[examples/video-tcp.md](../examples/video-tcp.md)）時長約 80 秒，稿件只有 835 個字元，也就是幾百個輸出 token。不配音時渲染不到 1 秒，用系統語音配音約 3 秒。只有你要影片時 Agent 才會做影片；高頻模式仍然只出頁面。完整語法：`am help video`。
