/**
 * 在线工具数据（全站唯一数据源）
 *
 * ─────────────────────────────────────────────────────────────
 * 如何新增一款在线工具：
 *   在下方 tools 数组中增加一条 OnlineTool 记录即可。
 *   在线工具页（/tools）与首页「在线工具」区块会自动同步，
 *   外部工具无需在本站再建详情页。
 *
 * 注意事项：
 *   1. url 填工具的线上地址（建议使用 pipiapp.cn 的子域名）。
 *   2. tagline / description 只写真实功能，不夸大宣传。
 * ─────────────────────────────────────────────────────────────
 */

/** 内置图标名，见 src/components/icons.ts */
export type ToolIconName = 'video' | 'image' | 'sliders' | 'gauge' | 'sparkle' | 'doc'

export interface OnlineTool {
  id: string
  name: string
  /** 一句话简介（卡片使用） */
  tagline: string
  /** 详细介绍（工具页正文） */
  description: string
  icon: ToolIconName
  /** 能力标签，如支持的平台 */
  tags: string[]
  /** 工具线上地址 */
  url: string
  /** 是否在首页展示 */
  featured?: boolean
}

export const tools: OnlineTool[] = [
  {
    id: 'pipi-qushuiyin',
    name: '皮皮去水印',
    tagline: '粘贴短视频分享链接，一键解析无水印视频、图集与 Live 实况照片。',
    description:
      '支持抖音、快手、小红书、B 站、微博、视频号等平台的分享链接，粘贴后即可解析无水印视频与图集原图，还能提取 Live 实况：解析出 mov 文件后 AirDrop 到 iPhone 存相册即为实况照片。打开即用，无需安装。',
    icon: 'video',
    tags: ['抖音', '快手', '小红书', 'B 站', '微博', '视频号', 'Live 实况'],
    url: 'https://qushuiyin.pipiapp.cn/',
    featured: true,
  },
]

/** 首页展示的在线工具（featured 优先） */
export function getFeaturedTools(limit = 3): OnlineTool[] {
  const sorted = [...tools].sort(
    (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false),
  )
  return sorted.slice(0, limit)
}
