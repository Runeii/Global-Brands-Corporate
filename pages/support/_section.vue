<template>
  <div>
    <SiteHeader></SiteHeader>
    <main class="container support">
      <div class="content" v-html="page.content.rendered"></div>
    </main>
    <SiteFooter></SiteFooter>
  </div>
</template>

<script>
// This is the catch all template for any WordPress pages that don't have a specific VUE template assigned
import axios from 'axios'
import SiteHeader from '~/components/SiteHeader.vue'
import SiteFooter from '~/components/SiteFooter.vue'

export default {
  components: {
    SiteHeader,
    SiteFooter
  },
  mounted () {
    if (this.$nuxt.$route.hash) {
      let el = this.$nuxt.$el.querySelector(this.$nuxt.$route.hash)
      console.log(el)
      if (el) {
        el.scrollIntoView({behavior: 'smooth', block: 'start'})
      }
    }
  },
  async asyncData (context) {
    return axios.get(context.store.state.ajaxurl + '/wp/v2/pages?slug=' + context.params.section)
      .then((res) => {
        if (res.data.length > 0) {
          return {
            page: res.data[0]
          }
        } else {
          context.error({ statusCode: '404', message: 'Page not found' })
        }
      })
      .catch((error) => {
        context.error({ statusCode: error.response.status, message: context.params.section })
      })
  }
}
</script>
