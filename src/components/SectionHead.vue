<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    lede?: string
    center?: boolean
  }>(),
  { center: false },
)
</script>

<template>
  <div class="section-head" :class="{ 'section-head--center': center }">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h2 class="section-title">{{ title }}</h2>
    <p v-if="lede" class="section-lede">{{ lede }}</p>
  </div>
</template>
