<script setup lang="ts">
import { useHead } from '@unhead/vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'

// 静态渲染时会重置 html 属性，用 unhead 固定语言
useHead({
  htmlAttrs: { lang: 'zh-CN' },
})
</script>

<template>
  <a class="skip-link" href="#main">跳到主要内容</a>
  <SiteHeader />
  <main id="main">
    <RouterView />
  </main>
  <SiteFooter />
</template>
