---
title: Kubernetes 是怎麼發展起來的
subtitle: 從 Google 內部的叢集管理器，到執行容器的預設方式
cols: 3
---
## A 時間線 {span=3}
```timeline h
2003 | Google 內部的 Borg | 承載 Google 絕大部分任務
2013 | Docker 發表 | 容器變得容易建構
*2014 | Kubernetes 發表 | 開源，用 Go 編寫
2015 | v1.0 與 CNCF | Google 把項目交給基金會
2018 | CNCF 首個畢業項目 | 項目進入穩定期
2022 | v1.24 移除 dockershim | 任意 CRI 執行時期都能用
```

## B 從 Borg 繼承的設計 {span=2}
| Borg 裡的設計 | Kubernetes 裡的對應 |
|---|---|
| 用標記給任務分組 | Label 和 Selector |
| 部署在一起的一組任務 | Pod |
| 每組任務一個 IP | 每個 Pod 一個 IP |
| 集中的狀態儲存 | etcd |

## C 為什麼能普及
- 各大雲廠商都提供託管服務。
- 筆記本和資料中心上的 API 完全一樣。
- 擴充和核心用同一套 API。
