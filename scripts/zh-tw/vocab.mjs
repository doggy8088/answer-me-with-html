// Settled Taiwan vocabulary fixes, applied after OpenCC (cn -> tw2) and
// re-applied by check.mjs to prove the pipeline is idempotent. Phrase pairs
// are context-specific; global pairs are corpus-wide. Order matters.
export const GLOBAL_VOCAB = [
  ['保存', '儲存'],       // save action; no 保存期限/方法 compounds exist in this corpus
  ['端口', '連接埠'],
  ['連線埠', '連接埠'],   // OpenCC degrades 連接埠 on a second pass; restore
  ['局域網', '區域網路'],
  ['登錄', '登入'],
  ['質量', '品質'],
  ['註釋', '註解'],
  ['全角', '全形'],
  ['半角', '半形'],
  ['文件', '檔案'],       // file-system files; documentation sense restored below
  ['參考檔案', '參考文件'],
];
export const PHRASES = [
  ['其他寫程式的 WAV', '其他編碼的 WAV'],
  ['瀏覽器自己寫程式並下載', '瀏覽器自己編碼並下載'],
  ['由頁面自己寫程式', '由頁面自己編碼'],
  ['通過 SSH 隧道訪問', '透過 SSH 隧道存取'],
  ['通過 `http://` 打開', '透過 `http://` 打開'],
  ['通過 `http://` 連結打開', '透過 `http://` 連結打開'],
  ['同一區域網路的設備訪問', '同一區域網路的設備存取'],
  ['給隧道單獨用一個本地連接埠', '給隧道單獨用一個本機連接埠'],
  ['本地配音', '本機配音'],
  ['（本地檔案或 `localhost`', '（本機檔案或 `localhost`'],
  ['匿名的訪問和點選統計', '匿名的瀏覽和點選統計'],
  ['本地圖片', '本機圖片'],
  ['本地製作', '本機製作'],
  ['## 通過 Tailscale', '## 透過 Tailscale'],
  ['通過 `am serve` 連結打開', '透過 `am serve` 連結打開'],
  ['通過 HTTP 提供', '透過 HTTP 提供'],
  ['關閉 JavaScript、打印和窄屏時', '關閉 JavaScript、列印和窄屏時'],
  ['在打印和 PNG/PDF 匯出時隱藏', '在列印和 PNG/PDF 匯出時隱藏'],
  ['打印時隱藏大綱條', '列印時隱藏大綱條'],
  ['打印時隱藏導軌', '列印時隱藏導軌'],
  ['渲染時會打印帶稿件行號的警告', '渲染時會輸出帶稿件行號的警告'],
  ['命令不會打印', '命令不會輸出'],
  ['會多打印一行', '會多輸出一行'],
  ['它會打印所有區域網路地址', '它會輸出所有區域網路地址'],
  ['並打印路徑', '並輸出路徑'],
  // 0.5.11 新增句式：紙本列印義用「列印」，音訊編碼義用「編碼」。
  ['按頁面自己的打印樣式', '按頁面自己的列印樣式'],
  ['打印和 PDF/PNG 匯出時隱藏', '列印和 PDF/PNG 匯出時隱藏'],
  ['其他 WAV 寫程式和其他格式', '其他 WAV 編碼和其他格式'],
  // OpenCC second-pass artifacts and first-pass mis-segmentations.
  ['隻影響', '只影響'],   // OpenCC 把副詞「只」（僅）誤轉為量詞「隻」
  ['選一個類別型', '選一個類型'],
  ['型別別', '型別'],
  ['字面量（Literal）（Literal）', '字面量（Literal）'],
  ['瞭什麼', '了什麼'],
];
export const applyVocab = (t) => {
  for (const [a, b] of [...GLOBAL_VOCAB, ...PHRASES]) t = t.split(a).join(b);
  return t;
};
