# 文档 (doc)

基于 [Docusaurus v3](https://docusaurus.io/) 与 TypeScript 构建的文档与指令使用手册。

---

## 本地开发与维护

### 1. 安装依赖
推荐使用 [pnpm](https://pnpm.io/)（Node.js >= 20）：

```bash
pnpm install
```

### 2. 启动本地开发服务
```bash
pnpm start
```
启动后访问 `http://localhost:3000/lunabot-doc/`。

### 3. 构建静态产物与类型检查
```bash
# TypeScript 类型校验
pnpm typecheck

# 编译生成生产静态页面
pnpm build

# 本地预览编译后的静态页面
pnpm serve
```
