---
title: sequence
---
## A 用令牌登入
```sequence num
瀏覽器 -> API: POST /login
API -> 鑑權服務: 校驗密碼
鑑權服務 --> API: 令牌
API --> 瀏覽器: 200，寫入 Cookie
```
