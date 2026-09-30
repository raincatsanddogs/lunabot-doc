---
title: "基础指令 (general)"
sidebar_position: 1
description: "LunaBot 基础管理、服务开关控制、黑名单与运维指令"
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 基础指令 (general)

基础指令模块提供了 LunaBot 的核心调度与群聊管理功能，涵盖多级帮助查询、群聊授权、单项服务启闭、全局黑名单过滤以及系统运维工具。

---

## 帮助与查询 {#help-query}

### 获取帮助 {#help}
`/help [服务名] [页码|指令名]`（别名：`/<指令名> help`）

查询 LunaBot 内置服务列表、翻页指令索引或指定指令的参数详细用法。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/help` | 查看当前所有可用服务清单与简介 |
| `/help sekai` | 查看 `sekai` 服务的指令图文索引 |
| `/help sekai 2` | 查看 `sekai` 服务第 2 页指令列表 |
| `/help sekai 猜曲绘` | 查看 `sekai` 服务下 `猜曲绘` 指令的详细参数 |
| `/猜曲绘 help` | 快捷呼出该指令的对应说明 |

---

## 群聊与服务开关 {#group-and-service}

:::info 权限说明
本节群授权与服务开关控制指令仅限超级管理员 (SUPERUSER) 使用。
:::

### 开启或关闭群聊 {#group-toggle}
🛠️ `@Bot /enable [群号]` / 🛠️ `@Bot /disable [群号]`

控制群聊的响应权限。新引入 LunaBot 的群聊默认为关闭状态，开启后才会响应普通群聊指令。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `@Bot /enable` | 在当前群内直接开启本群响应 |
| `@Bot /disable` | 在当前群内关闭本群响应 |
| `@Bot /enable 123456` | 远程为群号 123456 的群聊开启授权 |

---

### 查看群聊开启状态 {#group-status}
🛠️ `/group status`

列出当前所有已授权开启 LunaBot 响应的群聊列表与群信息。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/group status` | 查看所有已授权开启响应的群聊名单 |

---

### 开启或关闭服务 {#service-toggle}
🛠️ `/<服务名> on [群号]` / 🛠️ `/<服务名> off [群号]`

在指定群聊中独立启用或禁用某个具体服务（例如 `chat`、`sekai`、`alive` 等），不影响其他服务的正常运行。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/chat on` | 在当前群开启 AI 聊天服务 |
| `/chat off` | 在当前群关闭 AI 聊天服务 |
| `/alive on 123456` | 为群号 123456 的群聊开启存活检测服务 |

---

### 查看服务开启状态 {#service-status}
🛠️ `/service [服务名]` / 🛠️ `/<服务名> status [群号]`

查看指定服务的启闭情况，或查看当前群已开启的服务清单。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/service` | 查看当前群聊启用了哪些服务 |
| `/service chat` | 查看 `chat` 服务目前在哪些群聊处于开启状态 |
| `/alive status` | 检查当前群内 `alive` 服务是否开启 |

---

## 安全与黑名单管理 {#security-and-blacklist}

:::info 权限说明
本节指令仅限超级管理员 (SUPERUSER) 使用。
:::

### 全局黑名单管理 {#blacklist}
🛠️ `/blacklist <subcommand>`

管理全局黑名单。命中的消息将处于完全静默状态（不触发任何指令或自动对话，但仍保留入库审计）。

<Tabs>
<TabItem value="user" label="用户黑名单" default>

添加或解除指定 QQ 账号的 Bot 交互权限：

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/blacklist add 123456` | 将 QQ 号 123456 加入全局黑名单 |
| `/blacklist del 123456` | 从黑名单移除该用户 |
| `/blacklist list` | 查看当前黑名单总览 |

</TabItem>
<TabItem value="prefix" label="消息前缀屏蔽">

以特定字符开头的消息将直接静默忽略（用于避免与其他机器人的前缀冲突）：

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/blacklist prefix add # ! 。` | 屏蔽以 `#`、`!` 或 `。` 开头的消息 |
| `/blacklist prefix del #` | 移除 `#` 前缀屏蔽规则 |
| `/blacklist prefix list` | 查看已设置的前缀规则列表 |

</TabItem>
<TabItem value="word" label="包含短语屏蔽">

消息中只要含有指定短语即完全静默（忽略英文字符大小写）：

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/blacklist word add 菜单` | 消息中出现“菜单”即不响应 |
| `/blacklist word del 菜单` | 移除包含屏蔽词规则 |
| `/blacklist word list` | 查看所有包含屏蔽词列表 |

</TabItem>
<TabItem value="exact" label="精确匹配屏蔽">

仅当消息全文与目标文本完全一致时才静默（例如不影响包含该词的扩展句子）：

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/blacklist exact add 今日运势` | 仅精确等于“今日运势”时静默 |
| `/blacklist exact del 今日运势` | 删除该精确短语 |
| `/blacklist exact list` | 查看当前精确屏蔽短语列表 |

</TabItem>
</Tabs>

---

### 安全模式 {#safe-mode}
🛠️ `/safe`

开启或关闭应急安全模式。开启后 LunaBot 将进入静默防护状态，仅响应超级管理员发送的指令。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/safe` | 切换开启或关闭应急安全模式 |

---

## 系统与运维工具 {#ops-and-system}

:::info 权限说明
本节指令仅限超级管理员 (SUPERUSER) 使用。
:::

### 消息统计与绘图缓存 {#cache-and-stats}
🛠️ `/send count` / 🛠️ `/pcache [clear]`

查询当日累计消息发送量，或管理图片渲染引擎的本地缓存数据。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/send count` | 查询当天 LunaBot 累计发送的消息总条数 |
| `/pcache` | 列出当前图片渲染引擎生成的缓存键值列表 |
| `/pcache clear [key]` | 清空全部或删除指定键名的图像缓存 |

---

### 性能分析采样 {#profiling}
🛠️ `/profiling [cpu|wall]`（别名：`/性能分析`）

基于 `yappi` 启动或关闭性能剖析采样。分析结果保存在 `data/misc/profiler/` 目录下，可搭配 `snakeviz` 工具进行火焰图分析。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/性能分析` | 使用默认 CPU 时钟参数开启或关闭分析 |
| `/性能分析 wall` | 基于实际流逝时间（wall clock）进行性能采样 |

---

### 清理退群残留数据 {#clear-group}
🛠️ `/clean group`（别名：`/清理退群`）

清理已经退出的群聊或退群用户的残留订阅数据（黑白名单、功能订阅与定时任务），释放存储空间。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/clean group` | 执行退群残留垃圾数据清理 |
| `/清理退群` | 使用中文别名清理退群数据 |

---

### 执行本地代码 {#exec}
🛠️ `/exec <代码内容>`（别名：`/执行`）

在本地 Python 运行环境中动态执行代码并打印末行表达式结果。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/exec 1 + 1` | 在宿主机环境中执行代码并输出结果 |

:::danger 极高风险
该指令拥有完整的本地操作系统执行权限！
:::
