<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BrandMark from './BrandMark.vue'
import AppIcon from './AppIcon.vue'
import { mainNav, site } from '@/data/site'

const route = useRoute()
const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll(): void {
  scrolled.value = window.scrollY > 8
}

function isActive(to: string): boolean {
  return to === '/' ? route.path === '/' : route.path.startsWith(to)
}

function toggleMenu(): void {
  menuOpen.value = !menuOpen.value
}

function closeMenu(): void {
  menuOpen.value = false
}

function onKeydown(e: KeyboardEvent): void {
  if (e.key === 'Escape') closeMenu()
}

watch(
  () => route.fullPath,
  () => closeMenu(),
)

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('keydown', onKeydown)
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="site-header" :class="{ 'is-solid': scrolled || menuOpen }">
    <div class="container site-header__row">
      <RouterLink to="/" class="brand" :aria-label="`${site.name} 首页`">
        <BrandMark :size="34" />
        <span class="brand__name">{{ site.name }}</span>
        <span class="brand__en">{{ site.nameEn }}</span>
      </RouterLink>

      <nav class="site-nav" aria-label="主导航">
        <RouterLink
          v-for="item in mainNav"
          :key="item.to"
          :to="item.to"
          class="site-nav__link"
          :class="{ 'is-active': isActive(item.to) }"
          :aria-current="isActive(item.to) ? 'page' : undefined"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="site-header__actions">
        <RouterLink to="/software" class="btn btn--primary btn--sm header-cta">浏览软件</RouterLink>
        <button
          class="menu-btn"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          :aria-label="menuOpen ? '关闭菜单' : '打开菜单'"
          @click="toggleMenu"
        >
          <AppIcon :name="menuOpen ? 'close' : 'menu'" :size="22" />
        </button>
      </div>
    </div>

    <Transition name="menu">
      <nav v-if="menuOpen" id="mobile-menu" class="mobile-menu" aria-label="移动端导航">
        <RouterLink
          v-for="item in mainNav"
          :key="item.to"
          :to="item.to"
          class="mobile-menu__link"
          :class="{ 'is-active': isActive(item.to) }"
        >
          {{ item.label }}
          <AppIcon name="arrow-right" :size="18" />
        </RouterLink>
        <RouterLink to="/software" class="btn btn--primary mobile-menu__cta">浏览全部软件</RouterLink>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 60;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition:
    background-color 0.25s var(--ease-out),
    border-color 0.25s var(--ease-out),
    box-shadow 0.25s var(--ease-out);
}

.site-header.is-solid {
  background: rgba(250, 246, 241, 0.88);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  border-bottom-color: var(--line);
}

.site-header__row {
  display: flex;
  align-items: center;
  gap: 24px;
  height: var(--header-h);
}

/* 品牌 */
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  margin-right: auto;
}

.brand__name {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.brand__en {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--ink-3);
  transform: translateY(1px);
}

/* 桌面导航 */
.site-nav {
  display: flex;
  align-items: center;
  gap: 6px;
}

.site-nav__link {
  position: relative;
  padding: 8px 14px;
  border-radius: var(--radius-pill);
  font-size: 15px;
  font-weight: 500;
  color: var(--ink-2);
  text-decoration: none;
  transition:
    color 0.2s,
    background-color 0.2s;
}

.site-nav__link:hover {
  color: var(--ink);
  background: rgba(44, 37, 32, 0.05);
}

.site-nav__link.is-active {
  color: var(--orange-700);
  font-weight: 600;
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-btn {
  display: none;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-m);
  color: var(--ink);
  transition: background-color 0.2s;
}

.menu-btn:hover {
  background: rgba(44, 37, 32, 0.06);
}

/* 移动端菜单 */
.mobile-menu {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 20px 22px;
  background: rgba(250, 246, 241, 0.97);
  border-bottom: 1px solid var(--line);
  box-shadow: 0 24px 40px rgba(44, 37, 32, 0.08);
}

.mobile-menu__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 6px;
  font-size: 17px;
  font-weight: 500;
  color: var(--ink);
  text-decoration: none;
  border-bottom: 1px dashed var(--line);
}

.mobile-menu__link.is-active {
  color: var(--orange-700);
  font-weight: 600;
}

.mobile-menu__cta {
  margin-top: 16px;
  width: 100%;
}

.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.22s var(--ease-out),
    transform 0.22s var(--ease-out);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 820px) {
  .site-nav,
  .header-cta {
    display: none;
  }

  .menu-btn {
    display: inline-flex;
  }

  .brand__en {
    display: none;
  }
}
</style>
