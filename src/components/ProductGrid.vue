<script setup lang="ts">
import type { Product } from '@/data/products'
import ProductCard from './ProductCard.vue'

defineProps<{ products: Product[] }>()
</script>

<template>
  <div class="product-grid">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  gap: 20px;
}
</style>
