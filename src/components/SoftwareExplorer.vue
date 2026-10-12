<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  categories,
  getCategoryLabel,
  products,
  type CategoryId,
} from '@/data/products'
import AppIcon from './AppIcon.vue'
import EmptyState from './EmptyState.vue'
import ProductGrid from './ProductGrid.vue'

const query = ref('')
const activeCategory = ref<CategoryId | 'all'>('all')

const hasProducts = products.length > 0

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return products.filter((p) => {
    if (activeCategory.value !== 'all' && p.category !== activeCategory.value) {
      return false
    }
    if (!q) return true
    const haystack = `${p.name} ${p.tagline} ${p.description} ${getCategoryLabel(p.category)}`.toLowerCase()
    return haystack.includes(q)
  })
})

function resetFilters(): void {
  query.value = ''
  activeCategory.value = 'all'
}
</script>

<template>
  <div class="explorer">
    <template v-if="hasProducts">
      <div class="explorer__toolbar">
        <label class="explorer__search">
          <AppIcon name="search" :size="18" />
          <span class="sr-only">搜索软件</span>
          <input v-model="query" type="search" placeholder="搜索软件名称或功能…" />
        </label>

        <div class="explorer__cats" role="group" aria-label="按分类筛选软件">
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            class="explorer__cat"
            :class="{ 'is-active': activeCategory === cat.id }"
            :aria-pressed="activeCategory === cat.id"
            @click="activeCategory = cat.id"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>

      <p class="explorer__count" role="status">
        {{ query.trim() || activeCategory !== 'all' ? '找到' : '共' }}
        {{ filtered.length }} 款软件
      </p>

      <ProductGrid v-if="filtered.length" :products="filtered" />

      <div v-else class="explorer__none">
        <AppIcon name="search" :size="26" />
        <p>没有找到相关软件，换个关键词试试？</p>
        <button type="button" class="btn btn--soft btn--sm" @click="resetFilters">清除搜索与筛选</button>
      </div>
    </template>

    <template v-else>
      <EmptyState
        title="第一款软件正在打磨中"
        description="皮皮软件正在认真开发第一批工具，力求每一款都简单好用。想第一时间知道发布消息，可以先了解一下我们。"
      >
        <RouterLink to="/about" class="btn btn--primary">了解皮皮软件</RouterLink>
        <RouterLink to="/" class="btn btn--ghost">回到首页</RouterLink>
      </EmptyState>
    </template>
  </div>
</template>

<style scoped>
.explorer__toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px 20px;
  margin-bottom: 18px;
}

.explorer__search {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1 1 260px;
  max-width: 380px;
  height: 46px;
  padding: 0 16px;
  background: var(--surface);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-pill);
  color: var(--ink-3);
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.explorer__search:focus-within {
  border-color: var(--orange-500);
  box-shadow: 0 0 0 3px var(--orange-100);
}

.explorer__search input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--ink);
  font-size: 15px;
}

.explorer__search input::placeholder {
  color: var(--ink-3);
}

.explorer__cats {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.explorer__cat {
  height: 38px;
  padding: 0 16px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-pill);
  background: var(--surface);
  font-size: 14px;
  font-weight: 500;
  color: var(--ink-2);
  transition:
    color 0.2s,
    background-color 0.2s,
    border-color 0.2s;
}

.explorer__cat:hover {
  border-color: var(--orange-300);
  color: var(--orange-700);
}

.explorer__cat.is-active {
  background: var(--ink);
  border-color: var(--ink);
  color: #fff;
  font-weight: 600;
}

.explorer__count {
  margin-bottom: 18px;
  font-size: 13.5px;
  color: var(--ink-3);
}

.explorer__none {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 56px 20px;
  text-align: center;
  color: var(--ink-3);
  background: var(--surface);
  border: 1px dashed var(--line-strong);
  border-radius: var(--radius-l);
}

.explorer__none p {
  color: var(--ink-2);
}

@media (max-width: 480px) {
  .explorer__search {
    max-width: none;
    flex-basis: 100%;
  }

  .explorer__cat {
    height: 36px;
    padding: 0 14px;
    font-size: 13.5px;
  }
}
</style>
