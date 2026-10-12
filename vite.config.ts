import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { readProductSlugs } from './scripts/product-slugs.mjs'

const productsFile = fileURLToPath(new URL('./src/data/products.ts', import.meta.url))

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  ssgOptions: {
    script: 'async',
    includedRoutes(paths) {
      const slugs = readProductSlugs(productsFile)
      return paths.flatMap((path) => {
        // 用「404」路径让 vite-ssg 输出 dist/404.html（传 '404.html' 会变成 404.html.html）
        if (path.includes(':pathMatch')) return ['404']
        if (path === '/software/:slug') return slugs.map((slug) => `/software/${slug}`)
        if (path.includes(':')) return []
        return [path]
      })
    },
  },
})
