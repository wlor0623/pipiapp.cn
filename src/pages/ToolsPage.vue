<script setup lang="ts">
import PageHead from '@/components/PageHead.vue'
import ToolCard from '@/components/ToolCard.vue'
import { tools } from '@/data/tools'
import { useReveal } from '@/composables/useReveal'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: '在线工具',
  description:
    '皮皮软件在线工具合集，打开即用、无需安装：视频去水印、图集与 Live 实况解析等实用小工具，粘贴链接即可完成，持续更新。',
  path: '/tools',
})

useReveal()
</script>

<template>
  <div>
    <PageHead
      eyebrow="在线工具"
      title="在线工具"
      lede="打开即用、无需安装的实用小工具。粘贴链接就能完成，收藏起来随时用。"
    />
    <section class="section tools-list">
      <div class="container">
        <div v-if="tools.length" class="tools-grid" data-reveal>
          <ToolCard v-for="tool in tools" :key="tool.id" :tool="tool" />
        </div>
        <p v-else class="tools-empty">第一款在线工具正在打磨中，敬请期待。</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.tools-list {
  padding-top: clamp(8px, 2vw, 20px);
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.tools-empty {
  padding: 48px 0;
  text-align: center;
  color: var(--ink-3);
}
</style>
