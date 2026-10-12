<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import BrandValues from '@/components/BrandValues.vue'
import PageHead from '@/components/PageHead.vue'
import SectionHead from '@/components/SectionHead.vue'
import { site } from '@/data/site'
import { useReveal } from '@/composables/useReveal'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: '关于我们',
  description:
    '了解皮皮软件（PiPi App）：一个持续打造简单、实用、轻量软件工具的独立软件品牌，以及我们「小工具，也值得认真做好」的品牌理念。',
  path: '/about',
})

useReveal()
</script>

<template>
  <div>
    <PageHead
      eyebrow="关于我们"
      title="认真做好每一款软件。"
      lede="皮皮软件是一个持续打造实用软件产品的品牌。我们希望通过简单、易用的工具，帮助用户更轻松地完成日常任务。"
    />

    <section class="section about-body">
      <div class="container prose" data-reveal>
        <h2>我们从这里开始</h2>
        <p>
          电脑和手机里的软件越来越多，但真正「顺手」的并不多：有的功能堆砌、操作繁琐，有的广告缠身、动辄捆绑。
          皮皮软件想做的，恰恰相反——<strong>从一款小工具开始，逐步完善产品，让好用的软件变得触手可及。</strong>
        </p>
        <p>
          我们不追求大而全，而是关注那些真实、具体的使用场景：一张需要快速压缩的图片、一批需要整理的文件、
          一个每天重复的小操作。把这些小事做到位，就是皮皮软件存在的意义。
        </p>

        <h2>我们在做的事</h2>
        <p>皮皮软件的产品方向围绕普通用户的日常需求展开，包括：</p>
        <ul>
          <li>图片处理——让压缩、裁剪、格式转换这类操作一步到位；</li>
          <li>文件管理——帮用户更快地整理、查找和清理文件；</li>
          <li>系统工具——让系统维护变得简单、透明、放心；</li>
          <li>效率工具——把重复劳动交给软件，把时间留给自己；</li>
          <li>AI 应用——在合适的场景里，让 AI 成为顺手的小帮手。</li>
        </ul>
        <p>
          每一款软件发布前，我们都会认真打磨细节；发布后，也会根据真实使用反馈持续迭代。
          你可以在<a href="/software">全部软件</a>页面查看当前的进展。
        </p>

        <h2>为什么叫「皮皮」</h2>
        <p>
          「皮皮」听起来轻松、亲切，没有距离感——我们希望软件用起来也是这样：
          不复杂、不装腔，打开就能用，用完就忘掉它的存在。好的工具应该融入日常，而不是占据注意力。
        </p>
      </div>
    </section>

    <section class="section about-values">
      <div class="container">
        <SectionHead
          center
          eyebrow="品牌理念"
          title="小工具，也值得认真做好。"
          lede="我们相信规模不是标准，把每一件小事做到位才是。"
        />
        <div data-reveal>
          <BrandValues />
        </div>
      </div>
    </section>

    <section id="contact" class="section contact">
      <div class="container contact__inner" data-reveal>
        <SectionHead eyebrow="联系我们" title="说说你的想法。" />
        <p class="contact__text">
          如果你对产品有建议、需求，或者发现了问题，欢迎告诉我们。真实的声音会直接影响产品的迭代方向。
        </p>
        <a
          v-if="site.contactEmail"
          :href="`mailto:${site.contactEmail}`"
          class="btn btn--primary contact__mail"
        >
          <AppIcon name="mail" :size="17" /> {{ site.contactEmail }}
        </a>
        <p v-else class="contact__pending">正式的联系渠道正在搭建中，敬请期待。</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-body {
  padding-top: clamp(16px, 3vw, 32px);
}

.about-values {
  background: var(--surface);
  border-block: 1px solid var(--line);
}

.contact__inner {
  max-width: 720px;
}

.contact__inner :deep(.section-head) {
  margin-bottom: 0;
}

.contact__text {
  margin-top: 18px;
  color: var(--ink-2);
}

.contact__mail {
  margin-top: 22px;
}

.contact__pending {
  margin-top: 22px;
  padding: 14px 18px;
  background: var(--orange-50);
  border-radius: var(--radius-m);
  font-size: 14.5px;
  color: var(--orange-700);
}
</style>
