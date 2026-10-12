/** 构建产物内链检查：node scripts/check-links.mjs */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'

const dist = 'dist'
const files = []
;(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f)
    if (statSync(p).isDirectory()) walk(p)
    else if (f.endsWith('.html')) files.push(p)
  }
})(dist)

let bad = []
for (const f of files) {
  const html = readFileSync(f, 'utf-8')
  const hrefs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1])
  for (const h of hrefs) {
    if (h.startsWith('#') || /^(https?:|mailto:|data:)/.test(h)) continue
    const clean = h.split('#')[0].split('?')[0] || '/'
    const candidates = [
      join(dist, clean),
      join(dist, clean + '.html'),
      join(dist, clean, 'index.html'),
    ]
    if (!candidates.some((c) => existsSync(c) && statSync(c).isFile())) {
      bad.push(`${relative(dist, f)} -> ${h}`)
    }
  }
}

console.log(`checked ${files.length} html files`)
console.log(bad.length ? 'BROKEN LINKS:\n' + bad.join('\n') : 'no broken internal links')
process.exit(bad.length ? 1 : 0)
