<script setup lang="ts">
import PageHead from '@/components/PageHead.vue'
import SoftwareExplorer from '@/components/SoftwareExplorer.vue'
import { useReveal } from '@/composables/useReveal'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: '全部软件',
  description:
    '浏览皮皮软件旗下的全部软件产品：图片工具、系统工具、效率工具、文件工具与 AI 工具。支持按分类筛选与关键词搜索，找到适合你的实用软件。',
  path: '/software',
})

useReveal()
</script>

<template>
  <div>
    <PageHead
      eyebrow="软件产品"
      title="全部软件"
      lede="每一款都从小需求出发，认真打磨。支持按分类筛选与关键词搜索。"
    />
    <section class="section software-list">
      <div class="container">
        <SoftwareExplorer />
      </div>
    </section>
  </div>
</template>

<style scoped>
.software-list {
  padding-top: clamp(8px, 2vw, 20px);
}
</style>
