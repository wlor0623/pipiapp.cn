<script setup lang="ts">
import PageHead from '@/components/PageHead.vue'
import { site } from '@/data/site'
import { useSeo } from '@/composables/useSeo'

const operator = site.legalEntity || site.name

useSeo({
  title: '隐私政策',
  description: `皮皮软件隐私政策：了解我们在你访问 pipiapp.cn 与使用皮皮软件产品时，如何收集、使用和保护信息。`,
  path: '/privacy',
})

const updatedText = site.legalUpdated.replaceAll('-', ' 年 ') + ' 日'
</script>

<template>
  <div>
    <PageHead
      eyebrow="法律条款"
      title="隐私政策"
      lede="我们重视你的隐私。本政策说明你在访问本网站与使用皮皮软件产品时，信息是如何被处理的。"
    />

    <section class="section legal">
      <div class="container prose">
        <p class="legal-updated">最后更新：{{ updatedText }}</p>

        <h2>概述</h2>
        <p>
          本网站（{{ site.domain }}）由{{ operator }}运营。我们遵循合法、正当、必要的原则处理信息，
          只收集实现功能所必需的数据，不会出售你的个人信息。
        </p>

        <h2>我们收集哪些信息</h2>
        <p><strong>访问本网站时：</strong>本网站为静态展示站点，不设注册、登录或评论功能，不会主动收集你的姓名、电话、邮箱等个人身份信息。</p>
        <p><strong>使用皮皮软件产品时：</strong>各软件产品需要处理的信息以其详情页与软件内的说明为准。我们不会在产品中植入收集与你产品使用内容无关信息的代码。</p>

        <h2>信息的使用</h2>
        <p>我们收集的任何有限技术信息，仅用于保障网站与软件的正常运行、排查故障和改进产品体验，不用于其他目的。</p>

        <h2>第三方服务</h2>
        <p>
          软件的下载与分发可能经由第三方应用市场或下载渠道完成，这些渠道在你使用时会遵循其自身的隐私政策。
          我们建议你在通过第三方渠道下载软件前，了解对应渠道的隐私条款。
        </p>

        <h2>Cookie 与本地存储</h2>
        <p>本网站不使用跟踪类 Cookie。为维持网站正常运行，服务器可能产生基础的访问日志（如请求时间、访问页面），这些日志仅用于安全与运维目的。</p>

        <h2>数据安全</h2>
        <p>我们采取合理的技术与管理措施保护信息，防止未经授权的访问、披露或破坏。但请注意，互联网传输不存在绝对安全，我们也会持续改进防护能力。</p>

        <h2>未成年人保护</h2>
        <p>我们的产品面向普通用户，但并非专门面向未成年人设计。未成年人使用我们的产品时，建议在监护人的指导下进行。</p>

        <h2>政策的更新</h2>
        <p>本政策可能不时更新，更新后会在本页面公布并更新「最后更新」日期。继续使用本网站或相关产品，即表示你同意更新后的政策。</p>

        <h2>联系我们</h2>
        <p v-if="site.contactEmail">
          如果你对本政策或个人信息处理有任何疑问，请联系：
          <a :href="`mailto:${site.contactEmail}`">{{ site.contactEmail }}</a>。
        </p>
        <p v-else>
          如果你对本政策或个人信息处理有任何疑问，可以通过「关于我们」页面提供的渠道联系我们（正式联系渠道正在搭建中）。
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
