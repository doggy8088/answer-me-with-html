---
title: 這個倉庫怎麼把稿件變成頁面
subtitle: answer-me-with-html 的渲染路徑
cols: 3
---
## A 目錄 {meta="節選"}
```tree list
answer-me-with-html
  bin/am.js | CLI 入口
  src
    cli.js | 命令與參數
    parse.js | 解析稿頭和麵板
    *render.js | 渲染流水線
    components/ | flow、sequence、tree 等元件
    lint/ste.js | 寫作檢查
    themes/ | blueprint、shadcn、paper
    templates/ | sheet 與 doc 樣板
    runtime/ | 頁面指令碼
  skills/answer-me-with-html
    SKILL.md | Agent 讀的說明
    scripts/am.mjs | 封裝好的 CLI
```

## B 呼叫關係 {span=2}
```flow LR
(am render) -> cli.js
cli.js -> *render.js
render.js -> parse.js: 稿件
render.js -> lint/ste.js: 正文
render.js -> components: 程式碼塊
components -> dagre: 流程圖佈局
render.js -> templates & themes
templates -> [(page.html)]
group 封裝進 am.mjs: cli.js, render.js, parse.js, lint/ste.js, components, templates, themes, dagre
```

## C 從哪裡讀起 {span=3}
1. 先看 `src/render.js`，一個函式串起整條流水線。
2. 再看 `src/parse.js`，它把稿件拆成面板和程式碼塊。
3. 在 `src/components/` 裡挑一個元件看，每個元件把文本變成 SVG 或 HTML。
