---
title: 選一個首屏方向
subtitle: 同一個產品，三種落地頁。先看縮略圖，再選一個。
template: doc
theme: shadcn
lang: zh
file: landing-choice
---
縮略圖只畫結構，不代表最終視覺。選定後我按這個方向畫完整頁面。

## A 首屏選擇題 {bare}
```ask cards
三種首屏，你選哪一種？
* A 先講價值 | 標題直接說結果，適合第一次來的訪客
  :::html
  <svg viewBox="0 0 320 180" width="320" height="180" role="img" aria-label="左文右圖：標題和按鈕在左，產品截圖在右" xmlns="http://www.w3.org/2000/svg">
    <rect x=".5" y=".5" width="319" height="179" rx="8" style="fill:var(--paper);stroke:var(--line-2)"/>
    <path d="M.5 8A7.5 7.5 0 0 1 8 .5h304a7.5 7.5 0 0 1 7.5 7.5v10H.5Z" style="fill:var(--fill);stroke:var(--line-2)"/>
    <circle cx="12" cy="9" r="2" style="fill:var(--ink-3)"/>
    <circle cx="19" cy="9" r="2" style="fill:var(--ink-3)"/>
    <circle cx="26" cy="9" r="2" style="fill:var(--ink-3)"/>
    <rect x="64" y="6" width="192" height="6" rx="3" style="fill:var(--line-2)"/>
    <rect x="20" y="40" width="122" height="9" rx="2" style="fill:var(--ink)"/>
    <rect x="20" y="55" width="98" height="9" rx="2" style="fill:var(--ink)"/>
    <rect x="20" y="76" width="120" height="4" rx="2" style="fill:var(--ink-3)"/>
    <rect x="20" y="85" width="104" height="4" rx="2" style="fill:var(--ink-3)"/>
    <rect x="20" y="94" width="112" height="4" rx="2" style="fill:var(--ink-3)"/>
    <rect x="20" y="112" width="58" height="17" rx="8.5" style="fill:var(--accent)"/>
    <rect x="86" y="117" width="42" height="7" rx="3.5" style="fill:var(--ink-3)"/>
    <rect x="164" y="34" width="136" height="112" rx="6" style="fill:var(--fill);stroke:var(--line-2)"/>
    <circle cx="232" cy="78" r="18" style="fill:var(--accent);opacity:.18"/>
    <path d="M178 128l28-30 20 20 18-26 40 36Z" style="fill:var(--accent);opacity:.35"/>
    <rect x="178" y="44" width="44" height="5" rx="2.5" style="fill:var(--ink-3)"/>
  </svg>
  :::
- B 先給畫面 | 大圖先建立情緒，再補一句說明
  :::html
  <svg viewBox="0 0 320 180" width="320" height="180" role="img" aria-label="大圖在上：通欄主視覺，標題和按鈕居中" xmlns="http://www.w3.org/2000/svg">
    <rect x=".5" y=".5" width="319" height="179" rx="8" style="fill:var(--paper);stroke:var(--line-2)"/>
    <path d="M.5 8A7.5 7.5 0 0 1 8 .5h304a7.5 7.5 0 0 1 7.5 7.5v10H.5Z" style="fill:var(--fill);stroke:var(--line-2)"/>
    <circle cx="12" cy="9" r="2" style="fill:var(--ink-3)"/>
    <circle cx="19" cy="9" r="2" style="fill:var(--ink-3)"/>
    <circle cx="26" cy="9" r="2" style="fill:var(--ink-3)"/>
    <rect x="64" y="6" width="192" height="6" rx="3" style="fill:var(--line-2)"/>
    <rect x="14" y="28" width="292" height="86" rx="4" style="fill:var(--fill);stroke:var(--line-2)"/>
    <circle cx="240" cy="58" r="15" style="fill:var(--accent);opacity:.22"/>
    <path d="M24 104l54-46 34 30 30-44 60 60Z" style="fill:var(--accent);opacity:.28"/>
    <rect x="92" y="126" width="136" height="8" rx="2" style="fill:var(--ink)"/>
    <rect x="112" y="139" width="96" height="5" rx="2.5" style="fill:var(--ink-3)"/>
    <rect x="138" y="154" width="44" height="13" rx="6.5" style="fill:var(--accent)"/>
  </svg>
  :::
- C 只問一句 | 首屏只留一個問題和一個按鈕
  :::html
  <svg viewBox="0 0 320 180" width="320" height="180" role="img" aria-label="極簡：一個問題、一個輸入框和一個按鈕" xmlns="http://www.w3.org/2000/svg">
    <rect x=".5" y=".5" width="319" height="179" rx="8" style="fill:var(--paper);stroke:var(--line-2)"/>
    <path d="M.5 8A7.5 7.5 0 0 1 8 .5h304a7.5 7.5 0 0 1 7.5 7.5v10H.5Z" style="fill:var(--fill);stroke:var(--line-2)"/>
    <circle cx="12" cy="9" r="2" style="fill:var(--ink-3)"/>
    <circle cx="19" cy="9" r="2" style="fill:var(--ink-3)"/>
    <circle cx="26" cy="9" r="2" style="fill:var(--ink-3)"/>
    <rect x="64" y="6" width="192" height="6" rx="3" style="fill:var(--line-2)"/>
    <rect x="78" y="62" width="164" height="10" rx="2" style="fill:var(--ink)"/>
    <rect x="104" y="82" width="112" height="5" rx="2.5" style="fill:var(--ink-3)"/>
    <rect x="84" y="108" width="106" height="20" rx="10" style="fill:var(--paper);stroke:var(--line-2)"/>
    <rect x="94" y="116" width="54" height="4" rx="2" style="fill:var(--ink-3)"/>
    <rect x="198" y="108" width="38" height="20" rx="10" style="fill:var(--accent)"/>
    <rect x="124" y="148" width="72" height="4" rx="2" style="fill:var(--ink-3)"/>
  </svg>
  :::
```

```callout info 選定之後
點右上角 Reply 把選項發給我。我按這個方向畫完整頁面，並保留另外兩版做對比。
```
