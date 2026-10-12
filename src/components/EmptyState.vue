<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description: string
    /** compact 模式用于首页嵌入 */
    compact?: boolean
  }>(),
  { compact: false },
)
</script>

<template>
  <div class="empty" :class="{ 'empty--compact': compact }">
    <svg
      class="empty__art"
      viewBox="0 0 140 110"
      fill="none"
      role="img"
      aria-label="软件正在开发中的插画"
    >
      <circle cx="34" cy="30" r="4" fill="var(--orange-300)" opacity="0.8" />
      <circle cx="116" cy="42" r="5" fill="var(--amber-700)" opacity="0.28" />
      <circle cx="104" cy="16" r="3" fill="var(--orange-500)" opacity="0.55" />
      <rect
        x="38"
        y="26"
        width="64"
        height="58"
        rx="15"
        fill="var(--orange-50)"
        stroke="var(--orange-300)"
        stroke-width="2"
        stroke-dasharray="6 7"
      />
      <path
        d="M70 42c1.3 5.6 3.5 7.8 9.1 9.1-5.6 1.3-7.8 3.5-9.1 9.1-1.3-5.6-3.5-7.8-9.1-9.1 5.6-1.3 7.8-3.5 9.1-9.1z"
        fill="var(--orange-500)"
      />
      <path
        d="M87 66c.7 2.9 1.9 4.1 4.8 4.8-2.9.7-4.1 1.9-4.8 4.8-.7-2.9-1.9-4.1-4.8-4.8 2.9-.7 4.1-1.9 4.8-4.8z"
        fill="var(--orange-300)"
      />
      <path d="M46 96h48" stroke="var(--line-strong)" stroke-width="3" stroke-linecap="round" />
    </svg>
    <div class="empty__body">
      <h3 class="empty__title">{{ title }}</h3>
      <p class="empty__desc">{{ description }}</p>
      <div v-if="$slots.default" class="empty__actions">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: clamp(36px, 6vw, 64px) 24px;
  background: var(--surface);
  border: 1px dashed var(--line-strong);
  border-radius: var(--radius-l);
}

.empty--compact {
  padding: clamp(28px, 4vw, 44px) 24px;
}

.empty__art {
  width: min(180px, 56vw);
  margin-bottom: 8px;
}

.empty__title {
  font-size: 18px;
  letter-spacing: 0.02em;
}

.empty__desc {
  max-width: 420px;
  margin-top: 10px;
  font-size: 14.5px;
  color: var(--ink-2);
}

.empty__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 22px;
}
</style>
