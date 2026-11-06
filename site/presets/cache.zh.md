---
title: 快取用 Redis 還是 Memcached？
subtitle: 給一個 Web 應用選會話快取和頁面快取
cols: 3
---
兩者都是很快的記憶體儲存。區別在於重啟後資料還在不在，以及能存什麼型別的資料。

## A 逐項對比 {span=2}
| 需求 | Redis | Memcached |
|---|---|---|
| 重啟後保留資料 | ok RDB 快照、AOF 記錄 | no 只在記憶體裡 |
| 資料型別 | ok 字串、哈希、列表、集合 | warn 只有字串 |
| 按鍵設定過期 | ok 支援 | ok 支援 |
| 主從複製 | ok 內建 | no 不內建 |
| 多核利用 | warn 單個主執行緒 | ok 多執行緒 |
| 小鍵的記憶體開銷 | warn 略高 | ok 更低 |

## B 結論
```callout ok 選 Redis
會話必須在重啟後保留，購物車要用哈希結構，這兩點 Memcached 都做不到。
```
只有純頁面快取、隨時可以重建時，才考慮 Memcached。

## C 我們的資料 {span=3}
```kv cols=4
峰值: 每秒 4000 次請求
快取大小: 約 2 GB
重啟要求: 不丟會話
團隊經驗: 另外 2 個服務在用 Redis
```
