<script setup lang="ts">
import PageHead from '@/components/PageHead.vue'
import { site } from '@/data/site'
import { useSeo } from '@/composables/useSeo'

const operator = site.legalEntity || site.name

useSeo({
  title: '服务条款',
  description: '皮皮软件服务条款：使用本网站与皮皮软件产品时，你需要了解的服务内容、使用规范与相关约定。',
  path: '/terms',
})

const updatedText = site.legalUpdated.replaceAll('-', ' 年 ') + ' 日'
</script>

<template>
  <div>
    <PageHead
      eyebrow="法律条款"
      title="服务条款"
      lede="请在使用本网站与皮皮软件产品前阅读以下条款。使用即表示你已理解并同意这些约定。"
    />

    <section class="section legal">
      <div class="container prose">
        <p class="legal-updated">最后更新：{{ updatedText }}</p>

        <h2>条款的接受</h2>
        <p>
          本条款是你与{{ operator }}之间关于使用本网站（{{ site.domain }}）及相关软件产品的约定。
          你下载、安装或使用皮皮软件的任何产品，即视为已阅读并同意本条款。
        </p>

        <h2>服务内容</h2>
        <p>
          皮皮软件向你提供图片处理、文件管理、系统工具、效率工具、AI 应用等软件产品及相关支持服务。
          我们会持续更新和改进产品，具体功能以各软件详情页的说明为准。
        </p>

        <h2>软件的使用许可</h2>
        <p>
          除非另有说明，皮皮软件的产品授予你个人非独占、不可转让的使用许可，供你在自有设备上安装使用。
          未经许可，你不得对软件进行反向工程、反编译，或用于商业性二次分发。
        </p>

        <h2>知识产权</h2>
        <p>
          本网站与软件产品的内容（包括但不限于软件、文字、图片、Logo、页面设计）的知识产权归{{
            operator
          }}所有，受法律保护。未经书面许可，不得复制、转载或用于其他商业用途。
        </p>

        <h2>用户行为规范</h2>
        <p>使用本网站与产品时，你承诺不从事以下行为：</p>
        <ul>
          <li>利用产品从事违反法律法规或损害他人合法权益的活动；</li>
          <li>对软件进行恶意篡改、破解或传播恶意代码；</li>
          <li>以任何技术手段干扰本网站的正常运行。</li>
        </ul>

        <h2>免责声明</h2>
        <p>
          皮皮软件的产品按「现状」提供。我们尽力保证软件的质量与安全，但因网络环境、系统差异或不可抗力导致的
          使用问题，我们不承担由此产生的间接损失。使用软件前建议做好重要数据的备份。
        </p>

        <h2>责任限制</h2>
        <p>在法律允许的最大范围内，{{ operator }}对因使用或无法使用本网站、软件产品而产生的损害不承担责任。</p>

        <h2>条款的变更</h2>
        <p>
          我们可能根据业务与法律要求更新本条款，更新后会在本页面公布并更新「最后更新」日期。
          重大变更会以显著方式提示。
        </p>

        <h2>联系我们</h2>
        <p v-if="site.contactEmail">
          关于本条款的任何问题，请联系：<a :href="`mailto:${site.contactEmail}`">{{ site.contactEmail }}</a>。
        </p>
        <p v-else>
          关于本条款的任何问题，可以通过「关于我们」页面提供的渠道联系我们（正式联系渠道正在搭建中）。
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.legal {
  padding-top: clamp(12px, 2vw, 24px);
}

.legal-updated {
  font-size: 13.5px;
  color: var(--ink-3);
  padding-bottom: 18px;
  margin-bottom: 28px;
  border-bottom: 1px solid var(--line);
}
</style>
