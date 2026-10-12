<script setup lang="ts">
import { useHead } from '@unhead/vue'
import BrandMark from '@/components/BrandMark.vue'

useHead({
  title: '页面未找到 - 皮皮软件',
  meta: [{ name: 'robots', content: 'noindex, follow' }],
})
</script>

<template>
  <div class="nf">
    <div class="container nf__inner">
      <BrandMark :size="84" class="nf__mark" />
      <p class="nf__code" aria-hidden="true">404</p>
      <h1 class="nf__title">页面走丢了</h1>
      <p class="nf__desc">你要访问的页面不存在，或者已经被移动。先回首页看看，或者去逛逛我们的软件。</p>
      <div class="nf__actions">
        <RouterLink to="/" class="btn btn--primary">回到首页</RouterLink>
        <RouterLink to="/software" class="btn btn--ghost">浏览全部软件</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nf {
  min-height: 62vh;
  display: flex;
  align-items: center;
}

.nf__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-block: clamp(48px, 8vw, 96px);
}

.nf__mark {
  opacity: 0.94;
}

.nf__code {
  margin-top: 28px;
  font-size: clamp(56px, 9vw, 88px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.04em;
  color: var(--orange-100);
  -webkit-text-stroke: 2px var(--orange-300);
}

.nf__title {
  margin-top: 6px;
  font-size: clamp(24px, 3.4vw, 32px);
}

.nf__desc {
  max-width: 400px;
  margin-top: 12px;
  color: var(--ink-2);
}

.nf__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 30px;
}
</style>
