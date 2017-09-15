<template>
  <div class="page global-network">
    <main class="container">
      <PageHeader :data="page"></PageHeader>
      <Stats class="col-12"></Stats>
      <WorldMap class="anchor"></WorldMap>
    </main>
  </div>
</template>

<script>
// This is the catch all template for any WordPress pages that don't have a specific VUE template assigned
import PageHeader from '~/components/PageHeader.vue'
import ContactForm from '~/components/ContactForm.vue'
import Stats from '~/components/Stats.vue'
import WorldMap from '~/components/WorldMap.vue'
import axios from 'axios'

export default {
  head () {
    return {
      title: 'Global Distribution',
      meta: [
        { hid: 'description', name: 'description', content: 'As a global business, we have been selling our drinks around the world since 2000 and are expanding in to new markets.' }
      ]
    }
  },
  components: {
    PageHeader,
    ContactForm,
    Stats,
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
