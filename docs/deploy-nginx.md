# 静态 SPA 构建与 Nginx 部署指南

## 改造背景

本项目由 Lovable 脚手架生成，基于 TanStack Start，**原始形态是 SSR 全栈应用**：

- 默认 nitro 构建目标是 Cloudflare Workers（产物是 `wrangler.json` + Worker 代码，只能部署到 Cloudflare）
- 页面由服务端渲染，需要一个运行时服务端（Worker 或 Node 进程）处理每个请求

项目实际是纯展示型企业官网，没有动态服务端逻辑，因此**将其改造为纯静态 SPA**：构建期预渲染出应用 shell（`index.html`），其余全部在客户端渲染。部署只需要一个静态文件服务器（Nginx），不需要任何 Node 进程，也彻底摆脱了对 Cloudflare 的绑定。

## 变更内容

只改了 `vite.config.ts` 一处，启用 TanStack Start 插件原生的 SPA 模式并关闭 nitro 服务端打包：

1. `tanstackStart.spa.enabled: true`——构建期预渲染应用 shell 为 `index.html`
2. `tanstackStart.spa.prerender.outputPath: "/index"`——控制 shell 输出文件名为 `index.html`（插件默认会写成 `_shell.html`，必须显式覆盖）
3. `nitro: false`——静态托管不需要 nitro 产物，跳过服务端打包

改造后该配置在 Lovable 沙箱内构建时会被平台强制回 Cloudflare 目标，不影响 Lovable 上的预览；在自有环境构建则产出纯静态文件。

另有一处配套的资源修复：站点 logo 原先引用 Lovable 沙箱专属的资产描述符（`logo-glyph.png.asset.json`，其 URL 只在 Lovable 平台内有效，本地和 Nginx 上都会 404），已改为把真实图片放入 `src/assets/` 并使用标准 Vite 导入。

## 构建产物

```sh
npm run build
```

| 目录 | 内容 | 是否部署 |
| --- | --- | --- |
| `dist/client/` | `index.html` + `assets/`（JS/CSS/图片，均带内容 hash） | **是，只部署这个** |
| `dist/server/` | 预渲染用的服务端 bundle（约 144K） | 否，构建中间产物 |

说明：TanStack Start 的构建流程固定为「客户端 bundle → 服务端 bundle → 在构建机上运行服务端 bundle 渲染出 shell 的 `index.html`」。`dist/server/` 的使命在预渲染完成时就结束了，`index.html` 不引用它的任何内容，项目路由和组件也未使用 server functions。无法在保留预渲染的同时跳过它的生成，属于无害的中间产物。

## Nginx 配置

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/style-refine-works;   # 指向 dist/client 的内容
    index index.html;

    # 带 hash 的构建产物，长缓存
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback：所有路由回退到 index.html，由客户端渲染对应页面
    location / {
        try_files $uri $uri/ /index.html;
    }

    # index.html 本身不缓存，保证发版即生效
    location = /index.html {
        add_header Cache-Control "no-cache";
    }
}
```

## 部署步骤

```sh
# 构建机
npm install
npm run build

# 同步到服务器（--delete 清理旧版本 hash 产物）
rsync -av --delete dist/client/ user@server:/var/www/style-refine-works/
```

## 本地验证

用任意静态服务器模拟 Nginx 行为（所有未知路径回退 `index.html`）：

```sh
npx serve -s dist/client
```

验证要点：

- 直达 `/`、`/about`、`/case`、`/opensource` 均返回 `index.html` 并在浏览器中正确渲染
- 浏览器 Console 无错误（favicon 404 可忽略，或自行添加 `public/favicon.ico`）

## 已知事项

- **非首页路由的 `<title>` 是 hydration 后由客户端更新的**。对纯展示站无影响；若在意 SEO，需要改为全站预渲染方案（每个路由构建期生成独立 HTML），那是另一种配置。
- **`bunfig.toml` 指向 Lovable 私有 npm 镜像**，在自有环境安装依赖时用 `npm install`。
- **开发时 hydration 警告若指向 `<html>` 上多出的属性**（如 `trancy-version`），是浏览器翻译插件（Trancy 等）在 React 加载前改写了 DOM，与项目代码无关。可在插件设置中排除本站域名。
- 静态资源引用请使用标准 Vite 导入（如 `@/assets/xxx.png`），不要引用 Lovable 的 `.asset.json` 描述符。
