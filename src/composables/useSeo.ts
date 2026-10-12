import { useHead } from '@unhead/vue'
import { site } from '@/data/site'

export interface SeoOptions {
  /** 页面标题（自动拼接「 - 皮皮软件」，首页传 undefined 使用默认标题） */
  title?: string
  description: string
  /** 页面路径，如 /software（结尾不带斜杠，根路径为 /） */
  path: string
  type?: 'website' | 'article'
  /** 不希望被收录的页面（如 404） */
  noindex?: boolean
}

/** 统一设置每个页面的 title / description / canonical / OG / Twitter 卡片 */
export function useSeo({ title, description, path, type = 'website', noindex = false }: SeoOptions): void {
  const fullTitle = title ? `${title} - ${site.name}` : `${site.name}官网 - 好用的软件，从皮皮开始`
  const url = `${site.domain}${path}`
  const image = `${site.domain}/og-image.png`

  useHead({
    title: fullTitle,
    link: [{ rel: 'canonical', href: url }],
    meta: [
      { name: 'description', content: description },
      ...(noindex ? [{ name: 'robots', content: 'noindex, follow' }] : []),
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },
      { property: 'og:site_name', content: site.name },
      { property: 'og:locale', content: 'zh_CN' },
      { property: 'og:image', content: image },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
  })
}
