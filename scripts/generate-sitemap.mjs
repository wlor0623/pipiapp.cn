/**
 * 站点地图生成脚本（npm run build 时自动执行）
 *
 * 核心页面固定收录；软件详情页从 src/data/products.ts 中解析
 * 独立成行的 `slug: '...'` 字段自动收录（注释掉的模板不会误收录）。
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readProductSlugs } from './product-slugs.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const siteSource = readFileSync(resolve(root, 'src/data/site.ts'), 'utf-8')
const domain = siteSource.match(/domain:\s*'([^']+)'/)?.[1]
if (!domain) {
  console.error('[sitemap] 无法从 src/data/site.ts 解析 domain，请检查配置格式。')
  process.exit(1)
}

const slugs = readProductSlugs(resolve(root, 'src/data/products.ts'))

const corePaths = ['/', '/software', '/tools', '/about', '/privacy', '/terms']
const productPaths = slugs.map((slug) => `/software/${slug}`)

const urls = [...corePaths, ...productPaths]
  .map(
    (path) => `  <url>
    <loc>${domain}${path}</loc>
  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

writeFileSync(resolve(root, 'public/sitemap.xml'), xml, 'utf-8')
console.log(`[sitemap] 已生成 public/sitemap.xml（${corePaths.length} 个核心页面 + ${productPaths.length} 个软件详情页）`)
