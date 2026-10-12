import { onMounted, onUnmounted } from 'vue'

/**
 * 滚动进场动画：给页面内 [data-reveal] 元素进入视口时加 .is-visible。
 * 仅在客户端运行；尊重系统「减少动态效果」设置。
 */
export function useReveal(): void {
  let io: IntersectionObserver | undefined

  onMounted(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)'),
    )
    if (els.length === 0) return

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    els.forEach((el) => io?.observe(el))
  })

  onUnmounted(() => io?.disconnect())
}
