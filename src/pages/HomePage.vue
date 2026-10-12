<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import BrandMark from '@/components/BrandMark.vue'
import BrandValues from '@/components/BrandValues.vue'
import EmptyState from '@/components/EmptyState.vue'
import HeroVisual from '@/components/HeroVisual.vue'
import ProductGrid from '@/components/ProductGrid.vue'
import SectionHead from '@/components/SectionHead.vue'
import AppIcon from '@/components/AppIcon.vue'
import { site } from '@/data/site'
import { products } from '@/data/products'
import { getFeaturedTools } from '@/data/tools'
import { useReveal } from '@/composables/useReveal'
import { useSeo } from '@/composables/useSeo'

useSeo({
  description:
    '皮皮软件（PiPi App）是面向普通用户的独立软件品牌，提供实用软件工具与电脑软件下载：图片处理、文件管理、系统工具、效率工具与 AI 应用，简单好用，持续更新。',
  path: '/',
})

// 仅包含真实信息的结构化数据（品牌官网）
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            name: site.name,
            alternateName: site.nameEn,
            url: site.domain,
            logo: `${site.domain}/favicon.svg`,
          },
          {
            '@type': 'WebSite',
            name: site.name,
            url: site.domain,
            inLanguage: 'zh-CN',
          },
        ],
      }),
    },
  ],
})

useReveal()

const featured = computed(() => {
  const sorted = [...products].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))
  return sorted.slice(0, 6)
})

const featuredTools = computed(() => getFeaturedTools())
</script>

<template>
  <div>
    <!-- 首屏 -->
    <section class="hero">
      <div class="container hero__inner">
        <div class="hero__copy">
          <p class="hero__badge" data-reveal>
            <AppIcon name="sparkle" :size="14" />
            {{ site.nameEn }} · 独立软件品牌
          </p>
          <h1 class="hero__title" data-reveal="1">
            好用的软件，<br />
            从<span class="hero__accent">皮皮<svg class="hero__swash" viewBox="0 0 120 12" preserveAspectRatio="none" aria-hidden="true"><path d="M4 9c22-6 44-7 62-5 19 2 36 3 50-2" /></svg></span>开始。
          </h1>
          <p class="hero__lede" data-reveal="2">
            皮皮软件专注打造简单、实用的软件工具——图片处理、文件管理、系统工具与效率小件，让每一个小功能都能真正提高效率。
          </p>
          <div class="hero__actions" data-reveal="3">
            <RouterLink to="/software" class="btn btn--primary btn--lg">浏览全部软件</RouterLink>
            <RouterLink to="/about" class="btn btn--ghost btn--lg">了解皮皮软件</RouterLink>
          </div>
          <ul class="hero__points" data-reveal="3" aria-label="品牌特点">
            <li>简单易用</li>
            <li>实用高效</li>
            <li>持续更新</li>
          </ul>
        </div>
        <HeroVisual class="hero__visual" data-reveal="2" />
      </div>
    </section>

    <!-- 软件产品 -->
    <section id="products" class="section">
      <div class="container">
        <div class="home-products__head" data-reveal>
          <SectionHead
            eyebrow="软件产品"
            title="发现好用的软件"
            lede="从日常小工具到效率应用，找到适合你的软件。"
          />
          <RouterLink v-if="products.length" to="/software" class="btn btn--ghost btn--sm home-products__more">
            查看全部软件
          </RouterLink>
        </div>

        <ProductGrid v-if="products.length" :products="featured" />

        <EmptyState
          v-else
          compact
          title="第一款软件正在打磨中"
          description="我们正在认真开发第一批小工具，不追求数量，只求每一款都真正好用。发布后会第一时间在这里与大家见面。"
        >
          <RouterLink to="/about" class="btn btn--primary btn--sm">了解皮皮软件</RouterLink>
          <RouterLink to="/software" class="btn btn--ghost btn--sm">查看全部软件</RouterLink>
        </EmptyState>
      </div>
    </section>

    <!-- 在线工具 -->
    <section class="section tools-section">
      <div class="container">
        <div class="home-tools__head" data-reveal>
          <SectionHead
            eyebrow="在线工具"
            title="免安装，打开即用。"
            lede="在浏览器里直接完成的小工具，粘贴链接就能出结果。"
          />
          <RouterLink to="/tools" class="btn btn--ghost btn--sm home-tools__more">
            查看全部工具
          </RouterLink>
        </div>

        <div v-if="featuredTools.length" class="home-tools__list" data-reveal>
          <a
            v-for="tool in featuredTools"
            :key="tool.id"
            class="tool-strip"
            :href="tool.url"
            target="_blank"
            rel="noopener"
          >
            <span class="tool-strip__tile">
              <AppIcon :name="tool.icon" :size="24" />
            </span>
            <span class="tool-strip__body">
              <span class="tool-strip__name">{{ tool.name }}</span>
              <span class="tool-strip__tagline">{{ tool.tagline }}</span>
            </span>
            <span class="tool-strip__cta">打开 <AppIcon name="external" :size="15" /></span>
          </a>
        </div>
      </div>
    </section>

    <!-- 品牌理念 -->
    <section class="section values-section">
      <div class="container">
        <SectionHead
          center
          eyebrow="品牌理念"
          title="小工具，也值得认真做好。"
          lede="我们相信规模不是标准，把每一件小事做到位才是。"
          data-reveal
        />
        <div data-reveal>
          <BrandValues />
        </div>
      </div>
    </section>

    <!-- 关于 -->
    <section class="section about-teaser">
      <div class="container about-teaser__inner">
        <div class="about-teaser__copy" data-reveal>
          <SectionHead eyebrow="关于皮皮软件" title="认真做好每一款软件。" />
          <p class="about-teaser__text">
            皮皮软件是一个持续打造实用软件产品的品牌。我们希望通过简单、易用的工具，帮助用户更轻松地完成日常任务。从一款小工具开始，逐步完善产品，让好用的软件变得触手可及。
          </p>
          <RouterLink to="/about" class="btn btn--ghost about-teaser__btn">
            了解更多 <AppIcon name="arrow-right" :size="16" />
          </RouterLink>
        </div>
        <div class="about-teaser__visual" data-reveal="1" aria-hidden="true">
          <div class="about-teaser__mark">
            <BrandMark :size="150" />
          </div>
          <span class="about-tag about-tag--a">轻量</span>
          <span class="about-tag about-tag--b">易用</span>
          <span class="about-tag about-tag--c">持续更新</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ---------- 首屏 ---------- */

.hero {
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(52% 46% at 82% 12%, rgba(255, 122, 31, 0.09), transparent 70%);
  pointer-events: none;
}

.hero__inner {
  position: relative;
  display: grid;
  grid-template-columns: 1.04fr 0.96fr;
  align-items: center;
  gap: clamp(32px, 5vw, 64px);
  padding-block: clamp(56px, 9vw, 104px) clamp(64px, 10vw, 120px);
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 30px;
  padding: 0 14px;
  border-radius: var(--radius-pill);
  background: var(--orange-100);
  color: var(--orange-700);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.hero__title {
  margin-top: 22px;
  font-size: clamp(36px, 5.6vw, 60px);
  line-height: 1.22;
  letter-spacing: 0.02em;
}

.hero__accent {
  position: relative;
  display: inline-block;
  color: var(--orange-600);
}

.hero__swash {
  position: absolute;
  left: -4%;
  bottom: -0.12em;
  width: 108%;
  height: 0.18em;
  overflow: visible;
}

.hero__swash path {
  fill: none;
  stroke: var(--orange-300);
  stroke-width: 7;
  stroke-linecap: round;
}

.hero__lede {
  max-width: 505px;
  margin-top: 22px;
  font-size: clamp(15.5px, 1.7vw, 17.5px);
  color: var(--ink-2);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 34px;
}

.hero__points {
  display: flex;
  gap: 10px 0;
  align-items: center;
  margin-top: 26px;
  font-size: 13.5px;
  color: var(--ink-3);
}

.hero__points li {
  display: flex;
  align-items: center;
}

.hero__points li + li::before {
  content: '';
  width: 4px;
  height: 4px;
  margin: 0 14px;
  border-radius: 50%;
  background: var(--line-strong);
}

.hero__visual {
  justify-self: center;
  width: 100%;
}

/* ---------- 首页产品区 ---------- */

.home-products__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.home-products__head :deep(.section-head) {
  margin-bottom: 0;
}

.home-products__head + .product-grid,
.home-products__head + .empty {
  margin-top: clamp(32px, 5vw, 52px);
}

/* ---------- 首页在线工具区 ---------- */

.tools-section {
  padding-top: 0;
}

.home-tools__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.home-tools__head :deep(.section-head) {
  margin-bottom: 0;
}

.home-tools__list {
  display: grid;
  gap: 14px;
  margin-top: clamp(28px, 4vw, 40px);
}

.tool-strip {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px 22px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-l);
  box-shadow: var(--shadow-s);
  text-decoration: none;
  transition:
    transform 0.25s var(--ease-out),
    box-shadow 0.25s var(--ease-out),
    border-color 0.25s;
}

.tool-strip:hover {
  transform: translateY(-2px);
  border-color: var(--orange-300);
  box-shadow: var(--shadow-m);
}

.tool-strip__tile {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 48px;
  height: 48px;
  border-radius: 28%;
  background: var(--orange-100);
  color: var(--orange-700);
}

.tool-strip__body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.tool-strip__name {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--ink);
}

.tool-strip:hover .tool-strip__name {
  color: var(--orange-700);
}

.tool-strip__tagline {
  font-size: 13.5px;
  color: var(--ink-2);
}

.tool-strip__cta {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex: none;
  margin-left: auto;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--orange-700);
}

.tool-strip__cta :deep(svg) {
  transition: transform 0.2s var(--ease-out);
}

.tool-strip:hover .tool-strip__cta :deep(svg) {
  transform: translate(2px, -2px);
}

/* ---------- 品牌理念 ---------- */

.values-section {
  background: var(--surface);
  border-block: 1px solid var(--line);
}

/* ---------- 关于 ---------- */

.about-teaser__inner {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: clamp(32px, 5vw, 72px);
}

.about-teaser__inner :deep(.section-head) {
  margin-bottom: 0;
}

.about-teaser__text {
  font-size: 15.5px;
  color: var(--ink-2);
}

.about-teaser__btn {
  margin-top: 26px;
}

.about-teaser__visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 260px;
}

.about-teaser__mark {
  display: flex;
  border-radius: 32px;
  box-shadow:
    0 3px 10px rgba(242, 96, 10, 0.14),
    0 28px 60px rgba(242, 96, 10, 0.2);
}

.about-tag {
  position: absolute;
  padding: 8px 16px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-pill);
  font-size: 13.5px;
  font-weight: 600;
  color: var(--ink-2);
  box-shadow: var(--shadow-s);
  animation: tag-float 5.5s ease-in-out infinite;
}

.about-tag--a {
  top: 12%;
  left: 8%;
  rotate: -5deg;
  color: var(--orange-700);
}

.about-tag--b {
  top: 38%;
  right: 4%;
  rotate: 4deg;
  animation-delay: 1.4s;
}

.about-tag--c {
  bottom: 8%;
  left: 18%;
  rotate: -3deg;
  color: var(--sage-700);
  animation-delay: 2.6s;
}

@keyframes tag-float {
  0%,
  100% {
    translate: 0 0;
  }

  50% {
    translate: 0 -6px;
  }
}

/* ---------- 响应式 ---------- */

@media (max-width: 960px) {
  .hero__inner {
    grid-template-columns: 1fr;
    padding-block: 48px 56px;
    gap: 44px;
  }

  .hero__visual {
    max-width: 380px;
  }

  .about-teaser__inner {
    grid-template-columns: 1fr;
  }

  .about-teaser__visual {
    order: -1;
    min-height: 200px;
  }
}

@media (max-width: 640px) {
  .home-products__head,
  .home-tools__head {
    flex-direction: column;
    align-items: flex-start;
  }

  .tool-strip__tagline {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .hero__actions :deep(.btn) {
    flex: 1 1 100%;
  }
}
</style>
