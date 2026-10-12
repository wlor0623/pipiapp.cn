<script setup lang="ts">
import { statusLabels, type ProductStatus } from '@/data/products'

defineProps<{ status: ProductStatus }>()
</script>

<template>
  <span class="badge" :class="`badge--${status}`">{{ statusLabels[status] }}</span>
</template>
