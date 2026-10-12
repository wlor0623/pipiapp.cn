/**
 * 站点元信息配置
 * 品牌名称、域名、文案与联系方式集中在这里管理。
 * 标注「待补充」的字段留空即可，页面会自动隐藏对应内容，不会展示占位假数据。
 */
export const site = {
  /** 品牌中文名 */
  name: '皮皮软件',
  /** 品牌英文名 */
  nameEn: 'PiPi App',
  /** 线上域名（用于 canonical / OG / sitemap，结尾不带斜杠） */
  domain: 'https://pipiapp.cn',
  /** 品牌口号 */
  slogan: '让软件更简单，让工具更好用。',
  /** 默认 SEO 描述 */
  description:
    '皮皮软件（PiPi App）是面向普通用户的独立软件品牌，提供实用软件工具与电脑软件下载：图片处理、文件管理、系统工具、效率工具与 AI 应用，简单好用，持续更新。',

  /** 联系邮箱（待补充）：留空时页面不显示邮箱入口 */
  contactEmail: '',

  /**
   * 法律主体名称（待补充）：用于隐私政策 / 服务条款中的运营方表述。
   * 留空时统一使用品牌名「皮皮软件」。
   */
  legalEntity: '',

  /** 隐私政策 / 服务条款的最后更新日期（YYYY-MM-DD） */
  legalUpdated: '2026-10-11',
} as const

export interface NavItem {
  label: string
  to: string
}

/** 顶部导航（保持简洁） */
export const mainNav: NavItem[] = [
  { label: '首页', to: '/' },
  { label: '全部软件', to: '/software' },
  { label: '在线工具', to: '/tools' },
  { label: '关于我们', to: '/about' },
]
