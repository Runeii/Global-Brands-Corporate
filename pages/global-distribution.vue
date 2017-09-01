<template>
  <div class="page global-network">
    <SiteHeader></SiteHeader>
    <main class="container">
      <PageHeader :data="page" class="col-12 col-md-10 col-lg-9"></PageHeader>
      <Stats class="col-12"></Stats>
      <WorldMap></WorldMap>
    </main>
    <SiteFooter></SiteFooter>
  </div>
</template>

<script>
// This is the catch all template for any WordPress pages that don't have a specific VUE template assigned
import SiteHeader from '~/components/SiteHeader.vue'
import PageHeader from '~/components/PageHeader.vue'
import ContactForm from '~/components/ContactForm.vue'
import Stats from '~/components/Stats.vue'
import SiteFooter from '~/components/SiteFooter.vue'
import WorldMap from '~/components/WorldMap.vue'
import axios from 'axios'

export default {
  components: {
    PageHeader,
    ContactForm,
    Stats,
    SiteHeader,
    SiteFooter,
    WorldMap
  },
  async asyncData (context) {
    return axios.get(context.store.state.ajaxurl + '/wp/v2/pages?slug=global-distribution')
      .then((res) => {
        return {
          page: res.data[0]
        }
      })
      .catch((error) => {
        context.error({ statusCode: error.response.status, message: error.response.data.message })
      })
  }
}
</script>
