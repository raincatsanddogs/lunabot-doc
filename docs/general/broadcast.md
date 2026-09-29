---
title: "广播服务 (broadcast)"
sidebar_position: 3
description: "跨群跨用户消息广播分发、通知订阅与分组群发管理"
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# 广播服务 (broadcast)

支持创建自定义广播主题分组，实现跨群通知分发、公告同步与多目标消息群发推送。

---

## 广播订阅与查看 {#subscription}

### 查询广播分组列表 {#list-groups}
`/bc list` / `/bc sublist`

查看系统内已创建的全部可用广播分组，或查询当前所在群聊（或私聊）已订阅的广播分组列表。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/bc list` | 查看系统已有的全部广播分组名称 |
| `/bc sublist` | 查询当前会话已订阅的广播分组 |

---

### 订阅与退订分组 {#toggle-sub}
`/bc sub <分组名>` / `/bc unsub <分组名>`

订阅或取消订阅特定主题的广播组。当该组发布新公告时将自动接收转发。在私聊中可自由订阅；在群聊中限超级管理员操作。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/bc sub Notice` | 订阅名为 `Notice` 的广播组 |
| `/bc unsub Notice` | 退订名为 `Notice` 的广播组 |
| `/bc unsuball` | 一键退订当前群聊已绑定的所有广播分组 |

---

## 分组维护与广播群发 {#admin}

:::info 权限说明
本节指令仅限超级管理员 (SUPERUSER) 使用。
:::

### 创建与删除广播组 {#manage-groups}
🛠️ `/bc add <分组名>` / 🛠️ `/bc del <分组名>`

新建或注销指定的广播分组，支持审计查看分组下的全部订阅目标。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/bc add EventNotice` | 新建名为 `EventNotice` 的广播分组 |
| `/bc del EventNotice` | 删除指定的广播分组及其所有关联订阅 |
| `/bc listsub EventNotice` | 审计查看该广播组下包含的所有目标群号与用户名单 |

---

### 发送广播消息 {#send-broadcast}
🛠️ `/bc send <目标分组|all> <消息内容>`

向指定分组内的全体订阅者分发广播。支持直接附带文本或引用回复已有富媒体消息。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/bc send all 大家好，Bot 将于今晚 24:00 维护。` | 全量广播至所有已开启 Bot 的群聊 |
| `/bc send Notice 游戏新版本现已更新上线！` | 仅向订阅了 `Notice` 分组的目标推送公告 |
| `[引用回复消息] /bc send Notice` | 将所回复的图文消息完整同步广播至目标组 |
