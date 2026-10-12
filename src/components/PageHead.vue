<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  lede?: string
}>()
</script>

<template>
  <header class="page-head">
    <div class="container">
      <p v-if="eyebrow" class="eyebrow" data-reveal>{{ eyebrow }}</p>
      <h1 class="page-head__title" data-reveal="1">{{ title }}</h1>
      <p v-if="lede" class="page-head__lede" data-reveal="2">{{ lede }}</p>
      <slot />
    </div>
  </header>
</template>

<style scoped>
.page-head {
  padding: clamp(44px, 7vw, 76px) 0 clamp(20px, 3vw, 32px);
}

.page-head__title {
  font-size: clamp(30px, 4.6vw, 44px);
  letter-spacing: 0.02em;
}

.page-head__lede {
  max-width: 560px;
  margin-top: 14px;
  font-size: clamp(15px, 1.6vw, 17px);
  color: var(--ink-2);
}
</style>
