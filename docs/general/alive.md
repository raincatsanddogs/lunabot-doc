---
title: "状态检测 (alive)"
sidebar_position: 2
description: "Bot 运行心跳检测、系统负载看板与定时巡检"
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# 状态检测服务 (alive)

用于实时测试与监控 LunaBot 的运行心跳、硬件负载（CPU/内存使用率）及在线健康度。

---

## 心跳与状态看板 {#heartbeat}

### 戳一戳测试心跳 {#poke}
`双击头像（戳一戳）`

在群聊或私聊中“戳一戳” Bot 头像，快速测试 Bot 进程是否正常存活并能响应事件。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `双击 Bot 头像` | 触发戳一戳心跳响应 |

---

### 查看运行状态图 {#status}
`@Bot 状态`（别名：`@Bot status`）

生成实时的系统健康状态海报，涵盖宿主机 CPU 占用、内存消耗、已运行时间、连接适配器延迟与关键进程数据。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `@Bot 状态` | 生成并发送当前系统的健康状态运行海报 |
| `@Bot status` | 使用英文别名查询状态 |

---

## 管理与定时巡检 {#admin}

:::info 权限说明
本节指令仅限超级管理员 (SUPERUSER) 使用。
:::

### 状态定时推送广播 {#status-notify}
🛠️ `/status notify <on|off>`

控制当前群是否开启每日固定的 Bot 状态自动播报。开启后将在每天预设时间点自动推送当前系统的健康报告。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/status notify on` | 开启本群每日状态定时推送 |
| `/status notify off` | 关闭本群每日状态定时推送 |

---

### 应急关闭进程 {#killbot}
🛠️ `/killbot`

安全终止当前 LunaBot 服务主进程。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/killbot` | 紧急安全关闭 Bot 主进程 |

:::danger 警告
调用后 Bot 将立即下线断开连接，通常由守护脚本（如 systemd/pm2）决定是否重启。
:::
