<script setup lang="ts">
import AppIcon from './AppIcon.vue'

const items = [
  {
    icon: 'sliders',
    tint: 'orange',
    title: '简单易用',
    text: '减少不必要的操作，让软件功能清晰直观，打开就能上手。',
  },
  {
    icon: 'gauge',
    tint: 'amber',
    title: '实用高效',
    text: '关注真实使用场景，让每款软件都为解决一个具体问题而生。',
  },
  {
    icon: 'refresh',
    tint: 'sage',
    title: '持续更新',
    text: '用心打磨细节，及时修复问题，并根据实际需求持续迭代。',
  },
] as const
</script>

<template>
  <ul class="values">
    <li v-for="item in items" :key="item.title" class="values__item">
      <span class="values__icon" :class="`values__icon--${item.tint}`">
        <AppIcon :name="item.icon" :size="22" />
      </span>
      <div>
        <h3 class="values__title">{{ item.title }}</h3>
        <p class="values__text">{{ item.text }}</p>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.values {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(28px, 4vw, 48px);
}

.values__item {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.values__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 15px;
}

.values__icon--orange {
  background: var(--orange-100);
  color: var(--orange-700);
}

.values__icon--amber {
  background: var(--amber-100);
  color: var(--amber-700);
}

.values__icon--sage {
  background: var(--sage-100);
  color: var(--sage-700);
}

.values__title {
  font-size: 18px;
  letter-spacing: 0.02em;
}

.values__text {
  margin-top: 8px;
  font-size: 14.5px;
  color: var(--ink-2);
}

@media (max-width: 820px) {
  .values {
    grid-template-columns: 1fr;
  }

  .values__item {
    flex-direction: row;
    align-items: flex-start;
    padding-top: 24px;
    border-top: 1px solid var(--line);
  }

  .values__item:first-child {
    padding-top: 0;
    border-top: none;
  }
}
</style>
