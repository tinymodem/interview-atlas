# Interview Atlas

`Interview Atlas` 是一个面向 AI / 大模型岗位的中英双语面试资料站，基于 `Next.js` 静态导出，可直接部署到 GitHub Pages。

## Local Development

```bash
npm install
npm run dev
```

开发服务器启动前会先执行 `npm run build-data`，把 [`content/interview-atlas-source.json`](/Users/krystal/Documents/Playground/qianfan/interview-site-next/content/interview-atlas-source.json) 生成到 `src/data/`。

## Content Model

- 题库源数据维护在 [`content/interview-atlas-source.json`](/Users/krystal/Documents/Playground/qianfan/interview-site-next/content/interview-atlas-source.json)
- 静态产物由 [`scripts/build-data.mjs`](/Users/krystal/Documents/Playground/qianfan/interview-site-next/scripts/build-data.mjs) 生成
- 站点包含 `zh` / `en` 两套路由，英文缺失时会回退到中文

## Build

```bash
npm test
npm run build
```

构建完成后，静态站点输出在 `out/`。

## GitHub Pages Deployment

1. 将仓库名设为 `interview-atlas`
2. 推送代码到 GitHub
3. 在仓库设置中打开 `Pages`
4. 选择 `GitHub Actions` 或直接发布 `out/` 目录
5. 若使用 Actions，请在构建环境中保留默认的 `GITHUB_ACTIONS=true`，站点会自动使用 `/interview-atlas` 作为子路径

部署完成后，建议提交 `sitemap.xml`、`robots.txt` 所对应的公开 URL 到 Bing Webmaster Tools 和 Google Search Console。
