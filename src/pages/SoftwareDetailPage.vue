<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import AppIcon from '@/components/AppIcon.vue'
import BrandMark from '@/components/BrandMark.vue'
import ProductIconTile from '@/components/ProductIconTile.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import {
  formatProductDate,
  getCategoryLabel,
  getProductBySlug,
  getRelatedProducts,
  platformLabels,
  productDetailPath,
} from '@/data/products'
import { site } from '@/data/site'
import { useReveal } from '@/composables/useReveal'

const route = useRoute()

const product = computed(() => getProductBySlug(String(route.params.slug)))
const related = computed(() => (product.value ? getRelatedProducts(product.value) : []))
const updatedText = computed(() =>
  product.value?.updatedAt ? formatProductDate(product.value.updatedAt) : undefined,
)
const platformsText = computed(() =>
  product.value ? product.value.platforms.map((p) => platformLabels[p]).join(' / ') : '',
)
const hasDownload = computed(
  () =>
    Boolean(product.value?.downloadUrl) || Boolean(product.value?.downloads?.length),
)

const downloadHint = computed(() => {
  switch (product.value?.status) {
    case 'released':
      return '安装包正在整理中，很快会在这里提供下载。'
    case 'developing':
      return '正在开发中，发布后会在这里第一时间提供下载。'
    default:
      return '已列入开发计划，敬请期待。'
  }
})

// 详情页 meta 随产品动态变化；不存在的 slug 设置 noindex
useHead({
  title: () =>
    product.value ? `${product.value.name} - ${site.name}` : `页面未找到 - ${site.name}`,
  link: [{ rel: 'canonical', href: () => `${site.domain}/software/${route.params.slug}` }],
  meta: () => [
    {
      name: 'description',
      content: product.value
        ? `${product.value.tagline} ${product.value.description}`.slice(0, 150)
        : '未找到该软件页面。',
    },
    ...(product.value ? [] : [{ name: 'robots', content: 'noindex, follow' }]),
    { property: 'og:title', content: () => (product.value ? product.value.name : '页面未找到') },
    {
      property: 'og:description',
      content: () => product.value?.tagline ?? '未找到该软件页面。',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: () => `${site.domain}/software/${route.params.slug}` },
    { property: 'og:site_name', content: site.name },
    { property: 'og:locale', content: 'zh_CN' },
    { property: 'og:image', content: `${site.domain}/og-image.png` },
  ],
  script: () =>
    product.value?.version
      ? [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: product.value!.name,
              operatingSystem: product.value!.platforms.map((p) => platformLabels[p]).join(', '),
              softwareVersion: product.value!.version,
              url: `${site.domain}/software/${product.value!.slug}`,
              publisher: { '@type': 'Organization', name: site.name },
            }),
          },
        ]
      : [],
})

useReveal()
</script>

<template>
  <article class="detail">
    <div class="container">
      <nav class="detail__back" aria-label="返回上一级">
        <RouterLink to="/software" class="detail__back-link">
          <AppIcon name="arrow-right" :size="16" class="detail__back-icon" />
          全部软件
        </RouterLink>
      </nav>

      <!-- 未找到该软件 -->
      <div v-if="!product" class="missing">
        <BrandMark :size="72" />
        <h1 class="missing__title">没有找到这款软件</h1>
        <p class="missing__desc">链接可能有误，或者这款软件已下架。可以去全部软件页面看看正在提供的工具。</p>
        <div class="missing__actions">
          <RouterLink to="/software" class="btn btn--primary">浏览全部软件</RouterLink>
          <RouterLink to="/" class="btn btn--ghost">回到首页</RouterLink>
        </div>
      </div>

      <template v-else>
        <!-- 头部 -->
        <header class="detail__hero" data-reveal>
          <ProductIconTile :icon="product.icon" :category="product.category" :size="84" />
          <div class="detail__hero-main">
            <div class="detail__titlerow">
              <h1 class="detail__name">{{ product.name }}</h1>
              <StatusBadge :status="product.status" />
            </div>
            <p class="detail__tagline">{{ product.tagline }}</p>
            <ul class="detail__meta">
              <li class="chip">{{ getCategoryLabel(product.category) }}</li>
              <li v-for="p in product.platforms" :key="p" class="chip">{{ platformLabels[p] }}</li>
              <li v-if="product.version" class="detail__meta-text">v{{ product.version }}</li>
              <li v-if="updatedText" class="detail__meta-text">更新于 {{ updatedText }}</li>
            </ul>
          </div>
        </header>

        <div class="detail__layout">
          <div class="detail__main">
            <section class="detail__block" data-reveal>
              <h2>软件介绍</h2>
              <p class="detail__desc">{{ product.description }}</p>
            </section>

            <section v-if="product.features?.length" class="detail__block" data-reveal>
              <h2>功能特性</h2>
              <ul class="detail__features">
                <li v-for="f in product.features" :key="f">
                  <span class="detail__check"><AppIcon name="check" :size="13" /></span>
                  {{ f }}
                </li>
              </ul>
            </section>

            <section v-if="product.screenshots?.length" class="detail__block" data-reveal>
              <h2>软件截图</h2>
              <div class="detail__shots">
                <figure v-for="shot in product.screenshots" :key="shot.src">
                  <img :src="shot.src" :alt="shot.alt" loading="lazy" width="640" height="400" />
                </figure>
              </div>
            </section>

            <section v-if="product.changelog?.length" class="detail__block" data-reveal>
              <h2>更新日志</h2>
              <ol class="detail__log">
                <li v-for="entry in product.changelog" :key="entry.version" class="detail__log-item">
                  <div class="detail__log-head">
                    <strong>v{{ entry.version }}</strong>
                    <time>{{ entry.date }}</time>
                  </div>
                  <ul class="detail__log-notes">
                    <li v-for="note in entry.notes" :key="note">{{ note }}</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section v-if="product.faq?.length" class="detail__block" data-reveal>
              <h2>常见问题</h2>
              <div class="detail__faq">
                <details v-for="item in product.faq" :key="item.question">
                  <summary>
                    {{ item.question }}
                    <AppIcon name="arrow-right" :size="16" class="detail__faq-icon" />
                  </summary>
                  <p>{{ item.answer }}</p>
                </details>
              </div>
            </section>
          </div>

          <aside class="detail__aside">
            <div class="dl-card" data-reveal="1">
              <h2 class="dl-card__title">下载软件</h2>
              <dl class="dl-card__info">
                <div v-if="product.version">
                  <dt>当前版本</dt>
                  <dd>v{{ product.version }}</dd>
                </div>
                <div v-if="updatedText">
                  <dt>最近更新</dt>
                  <dd>{{ updatedText }}</dd>
                </div>
                <div>
                  <dt>支持平台</dt>
                  <dd>{{ platformsText }}</dd>
                </div>
              </dl>

              <template v-if="hasDownload">
                <a
                  v-if="product.downloadUrl"
                  :href="product.downloadUrl"
                  class="btn btn--primary dl-card__main"
                  target="_blank"
                  rel="noopener"
                >
                  <AppIcon name="download" :size="17" /> 立即下载
                </a>
                <div v-if="product.downloads?.length" class="dl-card__opts">
                  <a
                    v-for="d in product.downloads"
                    :key="d.platform + d.url"
                    :href="d.url"
                    class="btn btn--ghost"
                    target="_blank"
                    rel="noopener"
                  >
                    {{ d.label ?? `下载 ${platformLabels[d.platform]} 版` }}
                  </a>
                </div>
              </template>
              <p v-else class="dl-card__hint">{{ downloadHint }}</p>

              <p class="dl-card__note">
                下载即表示同意
                <RouterLink to="/terms">服务条款</RouterLink>
                与
                <RouterLink to="/privacy">隐私政策</RouterLink>
              </p>
            </div>

            <div v-if="related.length" class="related" data-reveal="2">
              <h2 class="related__title">相关软件</h2>
              <RouterLink
                v-for="r in related"
                :key="r.id"
                :to="productDetailPath(r)"
                class="related__item"
              >
                <ProductIconTile :icon="r.icon" :category="r.category" :size="44" />
                <span class="related__text">
                  <span class="related__name">{{ r.name }}</span>
                  <span class="related__tagline">{{ r.tagline }}</span>
                </span>
              </RouterLink>
            </div>
          </aside>
        </div>
      </template>
    </div>
  </article>
</template>

<style scoped>
.detail {
  padding-bottom: clamp(56px, 8vw, 96px);
}

.detail__back {
  padding-block: 22px 6px;
}

.detail__back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ink-3);
  text-decoration: none;
  transition: color 0.2s;
}

.detail__back-link:hover {
  color: var(--orange-700);
}

.detail__back-icon {
  transform: scaleX(-1);
}

/* 头部 */
.detail__hero {
  display: flex;
  gap: 22px;
  align-items: flex-start;
  margin-top: 18px;
  padding: clamp(22px, 3.4vw, 34px);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-l);
  box-shadow: var(--shadow-s);
}

.detail__titlerow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.detail__name {
  font-size: clamp(24px, 3.2vw, 32px);
  letter-spacing: 0.02em;
}

.detail__tagline {
  margin-top: 8px;
  font-size: 15.5px;
  color: var(--ink-2);
}

.detail__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  margin-top: 16px;
}

.detail__meta-text {
  font-size: 13px;
  color: var(--ink-3);
}

/* 布局 */
.detail__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: clamp(28px, 4vw, 48px);
  margin-top: clamp(28px, 4vw, 44px);
  align-items: start;
}

.detail__main {
  min-width: 0;
}

.detail__block {
  margin-bottom: clamp(36px, 5vw, 52px);
}

.detail__block h2 {
  font-size: 21px;
  letter-spacing: 0.02em;
  margin-bottom: 18px;
}

.detail__desc {
  color: var(--ink-2);
  line-height: 1.9;
}

/* 功能特性 */
.detail__features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px 24px;
}

.detail__features li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14.5px;
  color: var(--ink-2);
}

.detail__check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 20px;
  height: 20px;
  margin-top: 3px;
  border-radius: 50%;
  background: var(--sage-100);
  color: var(--sage-700);
}

/* 截图 */
.detail__shots {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
  gap: 16px;
}

.detail__shots figure {
  border: 1px solid var(--line);
  border-radius: var(--radius-m);
  overflow: hidden;
  background: var(--surface);
}

.detail__shots img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}

/* 更新日志 */
.detail__log {
  position: relative;
  padding-left: 22px;
  border-left: 2px solid var(--line);
  display: grid;
  gap: 24px;
}

.detail__log-item {
  position: relative;
}

.detail__log-item::before {
  content: '';
  position: absolute;
  left: -28px;
  top: 6px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--orange-500);
  border: 2px solid var(--bg);
  box-shadow: 0 0 0 2px var(--orange-100);
}

.detail__log-head {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.detail__log-head strong {
  font-size: 15.5px;
}

.detail__log-head time {
  font-size: 13px;
  color: var(--ink-3);
}

.detail__log-notes {
  margin-top: 8px;
  display: grid;
  gap: 5px;
}

.detail__log-notes li {
  position: relative;
  padding-left: 16px;
  font-size: 14px;
  color: var(--ink-2);
}

.detail__log-notes li::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 0.72em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--line-strong);
}

/* FAQ */
.detail__faq details {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-m);
  margin-bottom: 10px;
  transition: border-color 0.2s;
}

.detail__faq details[open] {
  border-color: var(--orange-300);
}

.detail__faq summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 15px 18px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  list-style: none;
}

.detail__faq summary::-webkit-details-marker {
  display: none;
}

.detail__faq-icon {
  color: var(--ink-3);
  transform: rotate(90deg);
  transition: transform 0.2s var(--ease-out);
}

details[open] .detail__faq-icon {
  transform: rotate(90deg) scale(1.15);
  color: var(--orange-700);
}

.detail__faq details > p {
  padding: 0 18px 16px;
  font-size: 14.5px;
  color: var(--ink-2);
  line-height: 1.85;
}

/* 侧栏 */
.detail__aside {
  position: sticky;
  top: calc(var(--header-h) + 20px);
  display: grid;
  gap: 20px;
}

.dl-card {
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-l);
  box-shadow: var(--shadow-s);
}

.dl-card__title {
  font-size: 17px;
  margin-bottom: 16px;
}

.dl-card__info {
  display: grid;
  gap: 10px;
  margin-bottom: 18px;
}

.dl-card__info div {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 13.5px;
}

.dl-card__info dt {
  color: var(--ink-3);
}

.dl-card__info dd {
  margin: 0;
  color: var(--ink);
  font-weight: 500;
  text-align: right;
}

.dl-card__main {
  width: 100%;
}

.dl-card__opts {
  display: grid;
  gap: 10px;
  margin-top: 10px;
}

.dl-card__hint {
  padding: 12px 14px;
  background: var(--orange-50);
  border-radius: var(--radius-s);
  font-size: 13.5px;
  color: var(--orange-700);
  line-height: 1.7;
}

.dl-card__note {
  margin-top: 14px;
  font-size: 12px;
  color: var(--ink-3);
  line-height: 1.7;
}

.dl-card__note a {
  color: var(--ink-2);
  text-underline-offset: 3px;
}

/* 相关软件 */
.related__title {
  font-size: 15px;
  font-weight: 600;
  color: var(--ink-3);
  letter-spacing: 0.04em;
  margin-bottom: 12px;
}

.related__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: var(--radius-m);
  text-decoration: none;
  transition: background-color 0.2s;
}

.related__item:hover {
  background: var(--surface);
}

.related__text {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.related__name {
  font-size: 14.5px;
  font-weight: 600;
}

.related__item:hover .related__name {
  color: var(--orange-700);
}

.related__tagline {
  font-size: 12.5px;
  color: var(--ink-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 未找到 */
.missing {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: clamp(48px, 8vw, 88px) 20px;
}

.missing__title {
  margin-top: 24px;
  font-size: clamp(24px, 3.4vw, 32px);
}

.missing__desc {
  max-width: 420px;
  margin-top: 12px;
  color: var(--ink-2);
}

.missing__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 28px;
}

/* 响应式 */
@media (max-width: 900px) {
  .detail__layout {
    grid-template-columns: 1fr;
  }

  .detail__aside {
    position: static;
    order: -1;
  }
}

@media (max-width: 640px) {
  .detail__features {
    grid-template-columns: 1fr;
  }

  .detail__hero {
    flex-direction: column;
  }
}
</style>
