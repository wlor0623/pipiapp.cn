/**
 * 软件产品数据（全站唯一数据源）
 *
 * ─────────────────────────────────────────────────────────────
 * 如何新增一款软件：
 *   在下方 products 数组中增加一条 Product 记录即可。
 *   首页推荐区、全部软件列表、搜索/筛选、详情页路由
 *   （/software/<slug>）和 sitemap.xml 会自动同步。
 *
 * 注意事项：
 *   1. slug 建议独立成一行、使用两格缩进（站点地图脚本按行解析）。
 *   2. downloadUrl / downloads 只在有真实下载地址时填写；
 *      留空的软件不会显示下载按钮。
 *   3. version / updatedAt / changelog 只填写真实信息，不要虚构。
 *   4. 完整字段示例见文件底部的注释模板。
 * ─────────────────────────────────────────────────────────────
 */

export type ProductStatus = 'released' | 'developing' | 'planned'

export type CategoryId = 'image' | 'system' | 'efficiency' | 'files' | 'ai'

export type PlatformId = 'windows' | 'macos' | 'linux' | 'web' | 'android' | 'ios'

/** 内置图标名，见 src/components/icons.ts */
export type ProductIconName =
  | 'image'
  | 'folder'
  | 'box'
  | 'chip'
  | 'gauge'
  | 'sliders'
  | 'sparkle'
  | 'doc'

export interface Category {
  /** 'all' 仅用于列表筛选 */
  id: CategoryId | 'all'
  label: string
}

export const categories: Category[] = [
  { id: 'all', label: '全部软件' },
  { id: 'image', label: '图片工具' },
  { id: 'system', label: '系统工具' },
  { id: 'efficiency', label: '效率工具' },
  { id: 'files', label: '文件工具' },
  { id: 'ai', label: 'AI 工具' },
]

export const statusLabels: Record<ProductStatus, string> = {
  released: '已发布',
  developing: '开发中',
  planned: '规划中',
}

export const platformLabels: Record<PlatformId, string> = {
  windows: 'Windows',
  macos: 'macOS',
  linux: 'Linux',
  web: 'Web',
  android: 'Android',
  ios: 'iOS',
}

export interface ProductScreenshot {
  src: string
  alt: string
}

export interface ChangelogEntry {
  version: string
  date: string
  notes: string[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface ProductDownload {
  platform: PlatformId
  url: string
  label?: string
}

export interface Product {
  id: string
  name: string
  /** 路由标识，用于 /software/<slug> */
  slug: string
  /** 一句话简介（卡片与详情页头部使用） */
  tagline: string
  /** 详细介绍（详情页正文） */
  description: string
  icon: ProductIconName
  category: CategoryId
  platforms: PlatformId[]
  status: ProductStatus
  /** 以下字段留空 / 省略即表示暂无，对应模块自动隐藏 */
  version?: string
  updatedAt?: string
  /** 是否在首页优先展示 */
  featured?: boolean
  /** 外部详情页地址（可选，默认使用站内详情页） */
  detailUrl?: string
  /** 统一下载地址（可选；没有则不显示下载按钮） */
  downloadUrl?: string
  /** 分平台下载地址（可选） */
  downloads?: ProductDownload[]
  /** 功能特性列表（详情页） */
  features?: string[]
  /** 界面截图（详情页，src 为站内或外链图片地址） */
  screenshots?: ProductScreenshot[]
  /** 更新日志（详情页） */
  changelog?: ChangelogEntry[]
  /** 常见问题（详情页） */
  faq?: FaqItem[]
}

export const products: Product[] = [
  // ══════════════════════════════════════════════════════════
  // 产品为空时，首页与「全部软件」会展示优雅的空状态。
  // 新软件发布后，在这里按下方模板添加记录即可。
  // ══════════════════════════════════════════════════════════
]

/** 站内详情页地址（配置了外部 detailUrl 时优先外部） */
export function productDetailPath(product: Product): string {
  return product.detailUrl ?? `/software/${product.slug}`
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getCategoryLabel(id: CategoryId): string {
  return categories.find((c) => c.id === id)?.label ?? id
}

/** 相关推荐：同分类优先，最多 limit 条 */
export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const sameCategory = products.filter(
    (p) => p.id !== product.id && p.category === product.category,
  )
  const others = products.filter(
    (p) => p.id !== product.id && p.category !== product.category,
  )
  return [...sameCategory, ...others].slice(0, limit)
}

/** 2026-10-01 → 2026 年 10 月 */
export function formatProductDate(iso: string): string {
  const [y, m] = iso.split('-')
  if (!y || !m) return iso
  return `${y} 年 ${Number(m)} 月`
}

/* ────────────────────────────────────────────────────────────
   新产品记录模板（复制到 products 数组后按需删减）：

  {
    id: 'pipi-example',
    name: '皮皮示例工具',
    slug: 'pipi-example',
    tagline: '一句话说明它是做什么的。',
    description: '两三句话介绍这款软件解决什么问题、适合谁用。',
    icon: 'image',
    category: 'image',
    platforms: ['windows', 'macos'],
    status: 'released',
    version: '1.0.0',
    updatedAt: '2026-01-01',
    featured: true,
    downloadUrl: 'https://pipiapp.cn/downloads/pipi-example',
    downloads: [
      { platform: 'windows', url: 'https://…' },
      { platform: 'macos', url: 'https://…' },
    ],
    features: ['功能点一', '功能点二', '功能点三'],
    screenshots: [{ src: '/screenshots/pipi-example-1.png', alt: '界面截图说明' }],
    changelog: [{ version: '1.0.0', date: '2026-01-01', notes: ['首个公开版本'] }],
    faq: [{ question: '是否免费？', answer: '……' }],
  },
   ──────────────────────────────────────────────────────────── */
