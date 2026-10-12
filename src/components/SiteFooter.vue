<script setup lang="ts">
import BrandMark from './BrandMark.vue'
import { site } from '@/data/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="site-footer__top">
        <div class="site-footer__brand">
          <BrandMark :size="42" />
          <p class="site-footer__name">
            {{ site.name }} <span class="site-footer__en">{{ site.nameEn }}</span>
          </p>
          <p class="site-footer__slogan">{{ site.slogan }}</p>
          <p class="site-footer__desc">
            专注打造简单、实用、轻量的软件工具，让每一个小功能都能真正提高效率。
          </p>
        </div>

        <nav class="site-footer__cols" aria-label="页脚导航">
          <div class="site-footer__col">
            <h3>产品</h3>
            <ul>
              <li><RouterLink to="/">首页</RouterLink></li>
              <li><RouterLink to="/software">全部软件</RouterLink></li>
              <li><RouterLink to="/tools">在线工具</RouterLink></li>
            </ul>
          </div>
          <div class="site-footer__col">
            <h3>品牌</h3>
            <ul>
              <li><RouterLink to="/about">关于我们</RouterLink></li>
              <li><RouterLink to="/about#contact">联系方式</RouterLink></li>
            </ul>
          </div>
          <div class="site-footer__col">
            <h3>法律条款</h3>
            <ul>
              <li><RouterLink to="/privacy">隐私政策</RouterLink></li>
              <li><RouterLink to="/terms">服务条款</RouterLink></li>
            </ul>
          </div>
        </nav>
      </div>

      <div class="site-footer__bottom">
        <p>© {{ year }} {{ site.name }} pipiapp.cn · 保留所有权利</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--footer-bg);
  color: var(--footer-ink);
  padding: clamp(48px, 7vw, 72px) 0 32px;
  font-size: 14px;
}

.site-footer__top {
  display: flex;
  justify-content: space-between;
  gap: 48px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--footer-line);
}

.site-footer__brand {
  max-width: 300px;
}

.site-footer__name {
  margin-top: 16px;
  font-size: 18px;
  font-weight: 700;
}

.site-footer__en {
  margin-left: 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--footer-ink-2);
}

.site-footer__slogan {
  margin-top: 6px;
  color: var(--footer-ink);
  font-weight: 500;
}

.site-footer__desc {
  margin-top: 10px;
  line-height: 1.8;
  color: var(--footer-ink-2);
}

.site-footer__cols {
  display: flex;
  gap: clamp(32px, 6vw, 72px);
}

.site-footer__col h3 {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--footer-ink-2);
  margin-bottom: 14px;
}

.site-footer__col ul {
  display: grid;
  gap: 10px;
}

.site-footer__col a {
  color: var(--footer-ink);
  text-decoration: none;
  transition: color 0.2s;
}

.site-footer__col a:hover {
  color: var(--orange-300);
}

.site-footer__bottom {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  justify-content: space-between;
  padding-top: 24px;
  color: var(--footer-ink-2);
}

@media (max-width: 767px) {
  .site-footer__top {
    flex-direction: column;
    gap: 36px;
  }

  .site-footer__cols {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .site-footer__bottom {
    flex-direction: column;
  }
}
</style>
