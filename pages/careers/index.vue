<template>
  <div class="page careers">
    <SiteHeader></SiteHeader>
    <main class="container">
      <PageNavigation></PageNavigation>
      <PageHeader :data="page"></PageHeader>
      <CurrentVacancies id="listings" :careers="careers"></CurrentVacancies>
      <BlockImageLeft id="interviews" :data="interviews" title="Staff Interviews"></BlockImageLeft>
    </main>
    <SiteFooter></SiteFooter>
  </div>
</template>

<script>
import SiteHeader from '~/components/SiteHeader.vue'
import PageNavigation from '~/components/PageNavigation.vue'
import SiteFooter from '~/components/SiteFooter.vue'
import PageHeader from '~/components/PageHeader.vue'
import CurrentVacancies from '~/components/CurrentVacancies.vue'
import BlockImageLeft from '~/components/BlockImageLeft.vue'
import axios from 'axios'

export default {
  components: {
    PageHeader,
    PageNavigation,
    SiteHeader,
    SiteFooter,
    CurrentVacancies,
    BlockImageLeft
  },
  mounted () {
    if (this.$nuxt.$route.hash) {
      let el = this.$nuxt.$el.querySelector(this.$nuxt.$route.hash)
      if (el) {
        el.scrollIntoView({behavior: 'smooth', block: 'center'})
      }
    }
  },
  async asyncData (context) {
    return axios.get(context.store.state.ajaxurl + '/custom/jobs')
      .then((res) => {
        return {
          page: res.data.page,
          careers: res.data.listings,
          interviews: res.data.interviews
        }
      })
      .catch((error) => {
        context.error({ statusCode: error.response.status, message: error.response.data.message })
      })
  }
}
</script>
