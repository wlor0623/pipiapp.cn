<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import BrandMark from './BrandMark.vue'

/**
 * 首屏视觉：一组应用磁贴组成的「桌面」意象，
 * 中心是皮皮 Logo，四周是抽象的工具图标磁贴。
 */
interface HeroTile {
  icon: string
  tint: string
  rot: string
  delay: string
  logo?: boolean
}

const tiles: HeroTile[] = [
  { icon: 'image', tint: 'orange', rot: '-4deg', delay: '0s' },
  { icon: 'folder', tint: 'sand', rot: '3deg', delay: '0.8s' },
  { icon: 'chip', tint: 'amber', rot: '-2deg', delay: '1.6s' },
  { icon: 'gauge', tint: 'sage', rot: '2deg', delay: '2.4s' },
  { icon: '', tint: '', rot: '0deg', delay: '0.4s', logo: true },
  { icon: 'doc', tint: 'lilac', rot: '-3deg', delay: '1.2s' },
  { icon: 'sliders', tint: 'amber', rot: '-2deg', delay: '2s' },
  { icon: 'sparkle', tint: 'orange', rot: '4deg', delay: '2.8s' },
  { icon: 'box', tint: 'sand', rot: '2deg', delay: '0.9s' },
]
</script>

<template>
  <div class="hero-visual" aria-hidden="true">
    <div class="hero-visual__blob"></div>
    <div class="hero-visual__grid">
      <div
        v-for="(tile, i) in tiles"
        :key="i"
        class="tile"
        :class="[tile.logo ? 'tile--logo' : `tile--${tile.tint}`]"
        :style="{ '--rot': tile.rot, '--delay': tile.delay }"
      >
        <BrandMark v-if="tile.logo" :size="58" />
        <AppIcon v-else :name="tile.icon" :size="30" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-visual {
  position: relative;
  width: min(460px, 100%);
  margin-inline: auto;
}

.hero-visual__blob {
  position: absolute;
  inset: -12% -8%;
  background:
    radial-gradient(46% 42% at 62% 40%, rgba(255, 122, 31, 0.16), transparent 72%),
    radial-gradient(34% 30% at 26% 72%, rgba(255, 194, 75, 0.2), transparent 70%);
  z-index: 0;
}

.hero-visual__grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(14px, 2.4vw, 22px);
  justify-items: center;
  align-items: center;
}

.tile {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(72px, 9.6vw, 96px);
  aspect-ratio: 1;
  border-radius: 26%;
  border: 1px solid rgba(44, 37, 32, 0.05);
  box-shadow: var(--shadow-s);
  transform: rotate(var(--rot));
  animation: tile-float 6s ease-in-out infinite;
  animation-delay: var(--delay);
}

.tile--orange {
  background: var(--orange-100);
  color: var(--orange-700);
}

.tile--sand {
  background: var(--sand-100);
  color: var(--sand-700);
}

.tile--amber {
  background: var(--amber-100);
  color: var(--amber-700);
}

.tile--sage {
  background: var(--sage-100);
  color: var(--sage-700);
}

.tile--lilac {
  background: var(--lilac-100);
  color: var(--lilac-700);
}

.tile--logo {
  background: var(--surface);
  box-shadow:
    0 2px 4px rgba(44, 37, 32, 0.06),
    0 20px 44px rgba(242, 96, 10, 0.18);
  transform: rotate(var(--rot)) scale(1.16);
  z-index: 2;
}

@keyframes tile-float {
  0%,
  100% {
    translate: 0 0;
  }

  50% {
    translate: 0 -7px;
  }
}

@media (max-width: 640px) {
  .hero-visual {
    width: min(320px, 88vw);
  }

  /* 手机端只保留上半区磁贴，避免首屏过高 */
  .tile:nth-child(n + 7) {
    display: none;
  }
}
</style>
