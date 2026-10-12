<script setup lang="ts">
import type { OnlineTool } from '@/data/tools'
import AppIcon from './AppIcon.vue'

defineProps<{ tool: OnlineTool }>()
</script>

<template>
  <article class="tool-card">
    <div class="tool-card__head">
      <span class="tool-card__tile">
        <AppIcon :name="tool.icon" :size="26" />
      </span>
      <h3 class="tool-card__name">{{ tool.name }}</h3>
      <span class="tool-card__badge">在线</span>
    </div>

    <p class="tool-card__description">{{ tool.description }}</p>

    <ul v-if="tool.tags.length" class="tool-card__tags" aria-label="支持范围">
      <li v-for="tag in tool.tags" :key="tag">{{ tag }}</li>
    </ul>

    <div class="tool-card__meta">
      <a class="btn btn--primary btn--sm" :href="tool.url" target="_blank" rel="noopener">
        打开工具 <AppIcon name="external" :size="15" />
      </a>
    </div>
  </article>
</template>

<style scoped>
.tool-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
  padding: 22px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-l);
  box-shadow: var(--shadow-s);
  transition:
    transform 0.25s var(--ease-out),
    box-shadow 0.25s var(--ease-out),
    border-color 0.25s;
}

.tool-card:hover {
  transform: translateY(-3px);
  border-color: var(--orange-300);
  box-shadow: var(--shadow-m);
}

.tool-card__head {
  display: flex;
  align-items: center;
  gap: 13px;
}

.tool-card__tile {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 50px;
  height: 50px;
  border-radius: 28%;
  background: var(--orange-100);
  color: var(--orange-700);
}

.tool-card__name {
  font-size: 17px;
  letter-spacing: 0.02em;
}

.tool-card__badge {
  margin-left: auto;
  padding: 4px 11px;
  border-radius: var(--radius-pill);
  background: var(--sage-100);
  color: var(--sage-700);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.tool-card__description {
  font-size: 14px;
  line-height: 1.75;
  color: var(--ink-2);
}

.tool-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tool-card__tags li {
  padding: 4px 11px;
  border: 1px solid var(--line);
  border-radius: var(--radius-pill);
  background: var(--bg-soft);
  font-size: 12.5px;
  color: var(--ink-3);
}

.tool-card__meta {
  display: flex;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px dashed var(--line);
}
</style>
