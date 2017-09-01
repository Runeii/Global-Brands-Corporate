<template>
  <div class="page contact">
    <SiteHeader></SiteHeader>
    <main class="container">
      <PageHeader :data="page"></PageHeader>
      <Map></Map>
    </main>
    <SiteFooter></SiteFooter>
  </div>
</template>

<script>
// This is the catch all template for any WordPress pages that don't have a specific VUE template assigned
import SiteHeader from '~/components/SiteHeader.vue'
import PageHeader from '~/components/PageHeader.vue'
import SiteFooter from '~/components/SiteFooter.vue'
import ContactForm from '~/components/ContactForm.vue'
import Map from '~/components/Map.vue'
import axios from 'axios'

export default {
  components: {
    PageHeader,
    ContactForm,
    SiteHeader,
    SiteFooter,
    Map
  },
  async asyncData (context) {
    return axios.get(context.store.state.ajaxurl + '/wp/v2/pages?slug=contact')
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
