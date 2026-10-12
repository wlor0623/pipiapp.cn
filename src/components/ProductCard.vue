<script setup lang="ts">
import { computed } from 'vue'
import {
  getCategoryLabel,
  platformLabels,
  productDetailPath,
  type Product,
} from '@/data/products'
import AppIcon from './AppIcon.vue'
import ProductIconTile from './ProductIconTile.vue'
import StatusBadge from './StatusBadge.vue'

const props = defineProps<{ product: Product }>()

const path = computed(() => productDetailPath(props.product))
const platformsText = computed(() =>
  props.product.platforms.map((p) => platformLabels[p]).join(' / '),
)
const hasDownload = computed(
  () => Boolean(props.product.downloadUrl) || Boolean(props.product.downloads?.length),
)
</script>

<template>
  <article class="product-card">
    <div class="product-card__head">
      <ProductIconTile :icon="product.icon" :category="product.category" :size="52" />
      <div class="product-card__titles">
        <h3 class="product-card__name">
          <RouterLink :to="path">{{ product.name }}</RouterLink>
        </h3>
        <StatusBadge :status="product.status" />
      </div>
    </div>

    <p class="product-card__tagline">{{ product.tagline }}</p>

    <p class="product-card__platforms">{{ platformsText }}</p>

    <div class="product-card__meta">
      <span class="chip">{{ getCategoryLabel(product.category) }}</span>
      <span class="product-card__spacer"></span>
      <a
        v-if="hasDownload && product.downloadUrl"
        class="btn btn--soft btn--sm product-card__download"
        :href="product.downloadUrl"
        target="_blank"
        rel="noopener"
      >
        <AppIcon name="download" :size="15" /> 下载
      </a>
      <span class="product-card__more">
        详情 <AppIcon name="arrow-right" :size="15" />
      </span>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
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

.product-card:hover {
  transform: translateY(-3px);
  border-color: var(--orange-300);
  box-shadow: var(--shadow-m);
}

/* 卡片标题链接铺满整卡，方便点击 */
.product-card__name a::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
}

.product-card__head {
  display: flex;
  align-items: center;
  gap: 14px;
}

.product-card__titles {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}

.product-card__name {
  font-size: 17px;
  letter-spacing: 0.02em;
}

.product-card__name a {
  text-decoration: none;
}

.product-card:hover .product-card__name a {
  color: var(--orange-700);
}

.product-card__tagline {
  font-size: 14px;
  color: var(--ink-2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card__platforms {
  margin-top: -6px;
  font-size: 12.5px;
  color: var(--ink-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-card__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px dashed var(--line);
}

.product-card__spacer {
  flex: 1;
}

.product-card__download {
  position: relative;
  z-index: 1;
}

.product-card__more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--orange-700);
}

.product-card__more :deep(svg) {
  transition: transform 0.2s var(--ease-out);
}

.product-card:hover .product-card__more :deep(svg) {
  transform: translateX(3px);
}
</style>
