---
title: "代码运行 (code)"
sidebar_position: 3
description: "基于 glot.io 远端沙箱的安全多语言代码在线编译与运行"
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# 代码运行 (code)(暂不可用)

LunaBot 基于 [glot.io](https://glot.io) 云端沙箱环境提供即时代码编译与执行服务，群友可以在群内直接分享并验证算法逻辑与程序运行结果。

---

## 沙箱代码运行(暂不可用) {#run-code}

### 执行代码 {#code-exec}
`/code <语言代号> [标准输入参数]`（别名：`/run`）

在同一条消息内指定编程语言代号、标准输入及源码主体，换行输入源码。沙箱将编译并执行代码，返回标准输出（stdout）及标准错误（stderr）。

| 常用操作示例 | 对应说明 |
| :--- | :--- |
| `/code py`<br />`print("Hello, LunaBot!")` | 运行单段 Python 脚本并获取输出 |
| `/code py 3 5`<br />`a, b = map(int, input().split())`<br />`print(f"Sum = {a + b}")` | 传入标准输入 `3 5` 并执行计算（返回 `Sum = 8`） |
| `/code cpp`<br />`#include <iostream>`<br />`int main() { std::cout << 42; }` | 编译运行 C++ 源码 |
| `/run js`<br />`console.log([1, 2, 3].map(x => x * 2));` | 使用别名运行 JavaScript 代码 |

:::warning 运行安全与资源限制
- **沙箱隔离**：代码在 glot.io 的无状态独立容器中隔离执行，无法访问 Bot 宿主机文件系统或本地内网。
- **超时与熔断**：单次程序执行设有最大 CPU 耗时与内存配额，死循环或超大内存分配将被系统强制杀死终止。
:::

---

## 支持的语言矩阵 {#supported-languages}

当前沙箱环境支持 40+ 种编程语言：

| 分类 | 语言标识与别名 |
| :--- | :--- |
| **通用与系统** | `py` (Python), `cpp` / `c` (C++/C), `rust` , `go`, `java` , `c#` |
| **前端与脚本** | `js` (JavaScript), `ts` / `typescript` , `bash` (Bash shell), `lua` , `php` , `ruby` , `perl` |
| **现代新锐** | `zig` , `nim` , `kotlin` , `swift` , `scala` , `julia` , `crystal` |
| **函数式与逻辑** | `haskell` , `elixir` , `erlang` , `clojure` , `clisp` (Common Lisp), `fsharp` (F#), `ocaml` , `idris`  |
| **传统与其他** | `pascal` , `cobol` , `d` , `asm` (Assembly), `plaintext` (纯文本输出) |
