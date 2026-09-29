---
title: "Minecraft服务 (mc)"
sidebar_position: 3
description: "Minecraft 服务器互联、群消息双向同步、状态监控与 RCON 交互"
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Minecraft服务 (mc)

基于 Dynmap（卫星地图）插件或服务端日志监听与 RCON 协议，为 Minecraft 服务器与 QQ 群聊提供双向互联服务。支持在线玩家监控、断线告警、聊天双向转发以及远程管理控制。

---

## 游戏互联与消息同步 {#chat-sync}

### 发送消息到游戏内 {#send-msg}
`/send <消息内容>`

向 Minecraft 服务器广播聊天消息。游戏内将显示发送者的 QQ 群名片与发言内容。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/send 大家好！` | 向 Minecraft 服务器发送聊天广播 |

---

### 聊天转发前缀设置 {#chat-prefix}
`/getchatprefix` / 🔧 `/setchatprefix <前缀>`

配置从 Minecraft 游戏向 QQ 群转发消息的触发前缀。设置前缀后，只有游戏中以该字符开头的消息才会被转发到群内。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/getchatprefix` | 查看当前设置的消息转发前缀 |
| 🔧 `/setchatprefix !` | 设置仅转发游戏中以 `!` 开头的聊天 |

---

## 服务器状态与玩家统计 {#server-status}

### 查询服务器运行状态 {#info}
`/info`（修改介绍：🔧 `/setinfo <文本>`）

查询绑定的 Minecraft 服务器运行状态，包括当前游戏时间、MOTD 简介以及在线玩家列表与头像。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/info` | 查询当前服务器在线人数、延迟与玩家列表 |
| 🔧 `/setinfo 欢迎加入服务器！` | 自定义服务器的展示文本介绍（限管理员） |

---

### 玩家游玩时长与周目管理 {#playtime}
`/playtime`（周目管理：🔧 `/start game <周目名>`）

统计并排行当前周目中各玩家的累计在线游玩时长。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/playtime` | 查询并排行当前周目玩家在线时长 |
| 🔧 `/playtime clear` | 清空当前周目的累计时长记录 |
| 🔧 `/start game 第五周目空岛` | 开启新周目归档 |

---

## 监听与连接配置 {#listen-config}

### 监听模式与参数切换 {#listen-mode}
🔧 `/listen [模式]`

设置或查看当前群聊关联服务器的消息监听引擎（可选 `dynamicmap`、`log`、`off`），并配置连接接口。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| 🔧 `/listen dynamicmap` | 切换为 Dynmap 网页卫星地图轮询监听 |
| 🔧 `/listen log` | 切换为挂载读取本地日志文件监听 |
| 🔧 `/listen off` | 临时关闭消息监听与推送 |
| `/geturl` / 🔧 `/seturl <链接>` | 查看或配置 Dynmap 接口地址（如 `http://127.0.0.1:8123`） |
| 🔧 `/connect notify on` | 开启服务器断线与上线恢复通知 |

---

## RCON 远程指令交互 {#rcon}

### RCON 远程配置与命令执行 {#rcon-cmd}
🔧 `/rcon <Minecraft指令>`

通过安全 RCON 协议向 Minecraft 服务端控制台远程下发指令。

:::caution 安全提示
为了避免敏感密码在群聊中泄露，**设置 RCON 密码必须在私聊中向 Bot 发送**：`🔧 /setrconpw <群号> <RCON密码>`。
:::

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/getrconurl` / 🔧 `/setrconurl <地址:端口>` | 查看或配置远程 RCON 连接地址 |
| 🔧 `/rcon say 服务器将在10分钟后维护` | 远程在游戏内广播维护通知 |
| 🔧 `/rcon time set day` | 执行游戏内控制台指令 |

---

## 服务器管理权限管理 {#op-management}

### 查看与分配管理权限 {#op-manage}
`/oplist` / 🛠️ `/opadd @成员` / 🛠️ `/opdel @成员`

控制哪些群成员具备管理该 Minecraft 服务器的权限。分配与移除权限限超级管理员操作。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/oplist` | 查看当前群内被授予服务器管理权限的成员名单 |
| 🛠️ `/opadd @成员` | 为指定群成员赋予服务器管理权限（限超管） |
| 🛠️ `/opdel @成员` | 移除群成员的服务器管理权限（限超管） |
