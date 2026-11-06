---
template: doc
theme: shadcn
title: Answer me with HTML 是怎麼工作的
subtitle: 模型只寫內容稿，CLI 負責排版、畫圖和檢查
---

## A 一次 render 的全過程
```flow LR
(Markdown 稿件) -> parse: frontmatter + 面板
parse -> STE lint & 元件渲染
STE lint --> 終端警告
元件渲染 -> dagre 佈局: flow
元件渲染 & dagre 佈局 -> 樣板與插槽
樣板與插槽 -> *[(單檔案 HTML)]
group render.js: parse, STE lint, 元件渲染, dagre 佈局, 樣板與插槽
```

## B 模型和 CLI 的分工
| 工作 | 誰來做 |
|---|---|
| 決定講什麼、分幾個面板 | 模型 |
| 寫關係、資料和說明文字 | 模型 |
| 排版、配色、暗黑模式 | CLI |
| 計算圖形座標 | CLI（dagre） |
| 檢查寫作風格 | CLI（STE lint） |

```callout ok 結果
模型不再輸出 CSS、JS 和 SVG 座標。一次 Bash 呼叫就能拿到成品頁面。
```

## C 目錄結構
```tree list
answer-me-with-html
  `bin/am.js` | CLI 入口
  `src/`
    `parse.js` | 稿件 → 面板與塊
    `render.js` | 主流程
    `components/` | 8 個元件
    `lint/` | STE 受控寫作檢查
    `themes/` | blueprint 與 shadcn 兩套主題
  `skills/answer-me-with-html/` | Agent Skill
```

## D 出錯時怎麼辦
```sequence
模型 -> am: render 稿件
am --> 模型: ✗ L14 [flow] 錯誤 + 正確範例
模型 -> 模型: 按範例修正
模型 -> am: 再次 render
am --> 模型: ✓ 頁面路徑
```
