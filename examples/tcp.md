---
title: TCP 三次握手與四次揮手
subtitle: 一張圖看懂連線的建立與釋放
cols: 3
source: RFC 9293
---
TCP 先握手，再傳資料，最後揮手。每一步都靠序號和確認號對齊雙方狀態。

## A 三次握手 {span=2 meta="建立連線"}
```sequence num
participants: 客戶端, 伺服器
note 伺服器: LISTEN
客戶端 -> 伺服器: SYN, seq=x
note 客戶端: SYN_SENT
伺服器 -> 客戶端: SYN+ACK, seq=y, ack=x+1
note 伺服器: SYN_RCVD
客戶端 -> 伺服器: ACK, ack=y+1
note 客戶端, 伺服器: ESTABLISHED
```

## B 為什麼是三次
1. 第一次：伺服器確認客戶端能發。
2. 第二次：客戶端確認伺服器能收、能發。
3. 第三次：伺服器確認客戶端能收。

```callout warn 兩次不夠
舊的重複 SYN 可能延遲到達。只握手兩次時，伺服器會為它建立一條無用的連線。
```

## C 狀態遷移 {span=2 meta="簡化版"}
```flow LR
(CLOSED) -> LISTEN: 被動打開
LISTEN -> SYN_RCVD: 收 SYN / 發 SYN+ACK
(CLOSED) --> SYN_SENT: 主動打開 / 發 SYN
SYN_SENT -> *ESTABLISHED: 收 SYN+ACK / 發 ACK
SYN_RCVD -> *ESTABLISHED: 收 ACK
```

## D 關鍵數位
```kv cols=1
MSL: 報文最大生存時間，通常 30 秒到 2 分鐘
TIME_WAIT: 2 × MSL
ISN: 初始序號隨機生成，防止偽造
SYN 重試: Linux 預設 6 次
```

## E 四次揮手 {span=2 meta="釋放連線"}
```sequence num
客戶端 -> 伺服器: FIN
伺服器 --> 客戶端: ACK
note 伺服器: 繼續發送剩餘資料
伺服器 -> 客戶端: FIN
客戶端 --> 伺服器: ACK
note 客戶端: TIME_WAIT，等待 2MSL
```

## F 報文標誌位
| 標誌 | 作用 | 握手中 |
|---|---|---|
| SYN | 同步序號，發起連線 | ok 第 1、2 次 |
| ACK | 確認收到資料 | ok 第 2、3 次 |
| FIN | 發送方的資料已發完 | no 不參與 |
| RST | 立即重置連線 | warn 例外時 |
