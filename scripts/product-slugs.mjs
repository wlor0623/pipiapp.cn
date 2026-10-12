/**
 * 从 src/data/products.ts 读取 products 数组内的 slug 字段。
 * 只解析 `export const products = [ ... ]` 数组体内部：
 * - 文件尾部的注释模板（块注释）不在数组内，不会被误收录；
 * - 数组内以 // 注释掉的行不匹配行首 slug，同样被跳过。
 * 供 vite.config.ts（SSG 路由枚举）与 generate-sitemap.mjs（站点地图）共用。
 */
import { readFileSync } from 'node:fs'

export function readProductSlugs(productsFilePath) {
  const source = readFileSync(productsFilePath, 'utf-8')
  const arrayBody = source.match(/export const products[^=]*=\s*\[([\s\S]*?)\n\]/)?.[1] ?? ''
  return [...arrayBody.matchAll(/^\s+slug:\s*'([^']+)',?\s*$/gm)].map((m) => m[1])
}
