<template>
  <div class="page about-us">
    <SiteHeader></SiteHeader>
    <main class="container">
      <PageHeader :data="page" id="vision"></PageHeader>
      <PageHeader :data="page.associated.values" id="values"></PageHeader>
      <Timeline :milestones="timeline" id="history"></Timeline>
    </main>
    <Steve :data="steve"></Steve>
    <div class="container">
      <BlockImageLeft :data="directors" title="Directors" id="directors"></BlockImageLeft>
    </div>
    <SiteFooter></SiteFooter>
  </div>
</template>

<script>
// This is the catch all template for any WordPress pages that don't have a specific VUE template assigned
import SiteHeader from '~/components/SiteHeader.vue'
import PageHeader from '~/components/PageHeader.vue'
import Timeline from '~/components/Timeline.vue'
import SiteFooter from '~/components/SiteFooter.vue'
import Steve from '~/components/Steve.vue'
import BlockImageLeft from '~/components/BlockImageLeft.vue'
import axios from 'axios'

export default {
  components: {
    PageHeader,
    SiteHeader,
    SiteFooter,
    Timeline,
    Steve,
    BlockImageLeft
  },
  mounted () {
    if (this.$nuxt.$route.hash) {
      let el = this.$nuxt.$el.querySelector(this.$nuxt.$route.hash)
      if (el) {
        el.scrollIntoView({behavior: 'smooth', block: 'start'})
      }
    }
  },
  async asyncData (context) {
    return axios.get(context.store.state.ajaxurl + '/custom/about')
      .then((res) => {
        return {
          page: res.data.page,
          timeline: res.data.timeline,
          steve: res.data.steve,
          directors: res.data.directors
        }
      })
      .catch((error) => {
        context.error({ statusCode: error.response.status, message: error.response.data.message })
      })
  }
}
</script>
