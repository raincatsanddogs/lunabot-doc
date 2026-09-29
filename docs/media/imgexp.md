---
title: "搜图服务 (imgexp)"
sidebar_position: 2
description: "基于多引擎的以图搜图、网页媒体解析与高清原图抓取"
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# 搜图服务 (imgexp)

提供多引擎反向图片检索（以图搜图）以及主流社交媒体、网页视频资源的解析下载。

---

## 以图搜图(暂不可用) {#image-search}

### 搜图 {#search}
`[引用回复] /搜图`（别名：`/search`）

基于 Google Lens 与 SauceNAO 多源引擎并发检索目标图片的原始来源、插画作者 Pixiv/Twitter 主页以及出处详情。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `[引用图片] /搜图` | 检索所回复图片的原始出处与画师 |
| `/搜图`（同消息附带图片） | 直接带图发送并触发检索 |
| `[引用图片] /search` | 使用英文别名检索图片 |

---

## 媒体解析与抓取(暂不可用) {#media-download}

### 网页视频下载 {#video-download}
`/video <视频链接> [参数]`（别名：`/ytdlp`）

基于 yt-dlp 引擎解析并转码下载各大网页视频内容。可用参数：`-i` / `--info`（仅元信息）、`-g` / `--gif`（转动图）、`-l` / `--low-quality`（低画质）。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/video https://example.com/video` | 解析并下载网页视频 |
| `/video https://example.com/video -i` | 仅预览视频标题、时长与分辨率参数 |
| `/video https://example.com/video -g` | 下载视频并自动转换为 GIF 动图发送 |
| `/ytdlp https://example.com/video` | 使用别名调用解析引擎 |

---

### 推特原图解析与拼图 {#x-images}
`/ximg <推文链接> [拼图参数] [展示参数]`

一键提取指定 X (Twitter) 推文中的全部高清原画并按需排版合并。拼图参数：`-V`（垂直瀑布流）、`-H`（水平横排）、`-G`（网格九宫格）；展示参数：`-f`（合并转发折叠）、`-g`（合成 GIF）。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/ximg https://x.com/...` | 提取推文中的全部图片并原样发送 |
| `/ximg https://x.com/... -G` | 提取推文多图并以网格拼图发送 |
| `/ximg https://x.com/... -f` | 提取多图并以合并转发折叠消息发送 |
| `/ximg https://x.com/... -g` | 提取多图并合成为 GIF 动图发送 |
