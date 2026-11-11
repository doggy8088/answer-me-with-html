---
title: 使用者服務介面與模型
cols: 2
lang: zh
---

## A 類模型
```class LR
abstract Entity
  +id: string
class User
  -email: string
  +rename(name: string): void
interface UserRepository
  +find(id: string): User
class SqlUserRepository
  +find(id: string): User
User --|> Entity
SqlUserRepository ..|> UserRepository
SqlUserRepository ..> User: 讀取
```

## B 資料模型
```er LR
User
  id uuid PK
  email string UK
Session
  id uuid PK
  user_id uuid FK -> User
User 1--* Session: 擁有
```

## C HTTP 介面
```api
GET /users/{id}
path
  id uuid required | 使用者標識
query
  include string optional | 關聯資源
response 200 User
  id uuid required
  email string required
response 404 Error
  message string required
```

## D RPC 介面
```api
RPC users.UserService/GetUser
request GetUserRequest
  id string required
response OK User
  id string required
  email string \| null optional
response NOT_FOUND
```
