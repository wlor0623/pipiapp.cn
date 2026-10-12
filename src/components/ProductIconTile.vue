<script setup lang="ts">
import type { CategoryId, ProductIconName } from '@/data/products'
import AppIcon from './AppIcon.vue'

withDefaults(
  defineProps<{
    icon: ProductIconName
    category: CategoryId
    size?: number
  }>(),
  { size: 52 },
)

const tintClass: Record<CategoryId, string> = {
  image: 'icon-tile--image',
  system: 'icon-tile--system',
  efficiency: 'icon-tile--efficiency',
  files: 'icon-tile--files',
  ai: 'icon-tile--ai',
}
</script>

<template>
  <span class="icon-tile" :class="tintClass[category]" :style="{ width: `${size}px`, height: `${size}px` }">
    <AppIcon :name="icon" :size="Math.round(size * 0.46)" />
  </span>
</template>

<style scoped>
.icon-tile {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  border-radius: 28%;
}

.icon-tile--image {
  background: var(--orange-100);
  color: var(--orange-700);
}

.icon-tile--system {
  background: var(--amber-100);
  color: var(--amber-700);
}

.icon-tile--efficiency {
  background: var(--sage-100);
  color: var(--sage-700);
}

.icon-tile--files {
  background: var(--sand-100);
  color: var(--sand-700);
}

.icon-tile--ai {
  background: var(--lilac-100);
  color: var(--lilac-700);
}
</style>
