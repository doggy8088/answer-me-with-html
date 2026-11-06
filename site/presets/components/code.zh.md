---
title: code
theme: blueprint
---
## A 修復 {meta="示意程式碼"}
```ts title="retry.ts · sketch" hl=4
export async function retry<T>(fn: () => Promise<T>, times = 3) {
  for (let i = 1; ; i++) {
    try { return await fn() }
    catch (err) { if (i >= times) throw err } // 到達次數上限才拋出
  }
}
```
