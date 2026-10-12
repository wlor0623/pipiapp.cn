<script setup lang="ts">
import { useId } from 'vue'

/**
 * 皮皮软件品牌标识：暖橙渐变圆角方块 + 白色圆润「p」字标（右上圆点呼应 PiPi 的 i）。
 * 纯矢量，可作为网站 Logo、favicon 源与软件图标。
 */
withDefaults(defineProps<{ size?: number }>(), { size: 40 })

// 每个实例用独立渐变 id，避免同页多实例时重复 id 导致引用错乱（SSR 安全）
const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
const gradId = `pipi-g-${uid}`
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 96 96"
    fill="none"
    aria-hidden="true"
    class="brand-mark"
  >
    <defs>
      <linearGradient :id="gradId" x1="0" y1="0" x2="96" y2="96" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FC8527" />
        <stop offset="1" stop-color="#F95D13" />
      </linearGradient>
    </defs>
    <rect width="96" height="96" rx="20" :fill="`url(#${gradId})`" />
    <circle cx="48" cy="49.9" r="16.5" fill="#ffffff" />
    <circle cx="48" cy="49.9" r="7.2" :fill="`url(#${gradId})`" />
    <rect x="31.5" y="41" width="9" height="36.8" rx="4.5" fill="#ffffff" />
    <circle cx="66.5" cy="25.3" r="4.8" fill="#ffffff" />
  </svg>
</template>

<style scoped>
.brand-mark {
  flex: none;
}
</style>
