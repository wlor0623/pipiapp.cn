/**
 * 本地预览测试服务器（模拟静态托管：/software → software.html，/ → index.html）
 * 用法：node scripts/preview-server.mjs [端口] [根目录]
 */
import http from 'node:http'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'

const port = Number(process.argv[2]) || 4200
const root = resolve(process.argv[3] || 'dist')

const types = {
  '.html': 'text/html; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
}

http
  .createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0])
    if (p.endsWith('/')) p += 'index.html'
    let f = join(root, p)
    // 目录（如 dist/software/）或不存在时，尝试同名 .html
    const isDir = existsSync(f) && statSync(f).isDirectory()
    if (isDir || !existsSync(f)) {
      if (existsSync(f + '.html') && !statSync(f + '.html').isDirectory()) f += '.html'
      else if (isDir && existsSync(join(f, 'index.html'))) f = join(f, 'index.html')
    }
    try {
      const data = readFileSync(f)
      res.writeHead(200, { 'Content-Type': types[extname(f)] || 'application/octet-stream' })
      res.end(data)
    } catch {
      // 模拟带 SPA 回退的静态托管：未命中的路径回退到 index.html，由前端路由渲染
      const accept = req.headers.accept || ''
      if (accept.includes('text/html') && !extname(p)) {
        res.writeHead(200, { 'Content-Type': types['.html'] })
        res.end(readFileSync(join(root, 'index.html')))
        return
      }
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('404 Not Found')
    }
  })
  .listen(port, () => console.log(`preview server on http://127.0.0.1:${port}/ root=${root}`))
