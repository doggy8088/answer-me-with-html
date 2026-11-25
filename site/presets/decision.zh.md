---
title: 給快取改造做個方案
subtitle: 把頁面快取從行程記憶體搬到 Redis
cols: 3
---
## A 現狀 {meta="src/cache.ts"}
```ts title="cache.ts · 現狀"
const pages = new Map<string, string>()

export function getPage(key: string) {
  return pages.get(key)
}

export function setPage(key: string, html: string) {
  pages.set(key, html)
}
```
每台伺服器各存一份，發表一次就清空。

## B 方案 {span=2 meta="示意程式碼"}
```ts title="cache.ts · sketch"
import { createClient } from 'redis'

const redis = createClient({ url: process.env.REDIS_URL })
const TTL = 600 // 秒

export async function getPage(key: string) {
  return redis.get(`page:${key}`)
}

export async function setPage(key: string, html: string) {
  await redis.set(`page:${key}`, html, { EX: TTL })
}
```

## C 步驟 {span=2}
1. 引入 Redis 客戶端，啟動時讀取 `REDIS_URL`。
2. 把兩個函式改成 async，同時改掉 4 處呼叫。
3. 加開關上線，對比一天的命中率。
4. 刪除記憶體裡的 Map。

## D 待定的問題
```ask
頁面在快取裡存多久？
* 10 分鐘 | 和現在的發表節奏一致
- 1 小時 | 未命中更少，頁面更舊
- 直到下次發表 | 需要加清快取的步驟
```

```ask multi
除了頁面還快取什麼？
* 會話 | 發表後不掉登入
- API 回應 | 佔用更多記憶體
```
