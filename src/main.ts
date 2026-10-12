import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import routes from './router'
import './styles/tokens.css'
import './styles/base.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, _from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) {
        return {
          el: to.hash,
          top: 88, // 为吸顶导航留出空间
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
        }
      }
      return { top: 0 }
    },
  },
  () => {
    // 未来可在此安装全局插件
  },
)
