<script setup lang="ts">
import { computed } from 'vue'
import { iconPaths } from './icons'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number
  }>(),
  { size: 20 },
)

const paths = computed(() => iconPaths[props.name] ?? [])
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="app-icon"
  >
    <path v-for="(d, i) in paths" :key="i" :d="d" />
  </svg>
</template>

<style scoped>
.app-icon {
  flex: none;
}
</style>
