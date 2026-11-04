# 用 ElevenLabs 配音

[English](elevenlabs.md)

`am video` 可以用 [ElevenLabs](https://elevenlabs.io) 朗讀旁白。沒有 key 時用系統語音，所以這一步是可選的。

## 組態

1. 在 ElevenLabs 後台建立 API key。只勾選 **Text to Speech**（語音合成）權限就夠了，`am` 不呼叫別的介面。
2. 設定環境變數，再渲染。

   ```bash
   export ELEVENLABS_API_KEY="sk_..."     # 想長期生效，就把這行寫進 ~/.zshrc
   am video draft.md                      # 有 key 就自動用 ElevenLabs
   am video draft.md --voice elevenlabs   # 沒有 key 時直接報錯
   ```

Agent 只能讀到啟動它之前已經設好的變數。想把 ElevenLabs 固定為預設配音，執行 `am config set voice elevenlabs`。

## 選聲音和模型（可選）

聲音和模型適合的語言、風格因人而異，請按自己的需求選：

| 變數 | 作用 | 不設時 |
| :--- | :--- | :--- |
| `ELEVENLABS_VOICE_ID` | 聲音。在 ElevenLabs 的聲音頁複製 ID | `bIHbv24MWmeRgasZH58o`（Will，官方聲音） |
| `ELEVENLABS_MODEL_ID` | 模型，如 `eleven_v4_turbo`、`eleven_flash_v2_5`、`eleven_multilingual_v2` | `eleven_v4_turbo` |

預設值在免費套餐下可用，中英文稿件都能念。Will 母語是英語，ElevenLabs 只在 `eleven_multilingual_v2` 下把中文列為它的已驗證語言。想要聽起來是母語的中文，請自己選中文聲音。各模型支援的語言見[模型列表](https://elevenlabs.io/docs/overview/models)。

公共聲音庫裡的聲音需要付費套餐，免費套餐呼叫時 API 會返回 `402 paid_plan_required`。

## 費用與快取

ElevenLabs 按字元計費。每句旁白只合成一次，按聲音、模型和文本快取在 `~/.answer-me-with-html/cache/tts/`。只有改過的句子，或換了聲音、模型，才會重新計費。

## 報錯

命令列的提示是英文的：

| 報錯 | 原因 |
| :--- | :--- |
| `ElevenLabs returned 401` 或 `missing_permissions` | key 不對，或沒有語音合成權限 |
| `ElevenLabs returned 402`，含 `paid_plan_required` | 用了聲音庫裡的聲音，而你是免費套餐；換官方聲音或升級套餐 |
| `Cannot connect to ElevenLabs` | 60 秒內沒有回應，或沒有網路；加 `--voice off` 只出字幕 |
