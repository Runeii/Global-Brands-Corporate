<template>
  <main class="container support">
    <PageHeader v-for="(subpage, index) in page.connectedpages" :data="subpage" :id="subpage.post_name" :key="index" :class="{anchor: index > 0}"></PageHeader>
  </main>
</template>

<script>
// This is the catch all template for any WordPress pages that don't have a specific VUE template assigned
import axios from 'axios'
import PageHeader from '~/components/PageHeader.vue'

export default {
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'Through Marketing support, Training and Insights our teams are here to help you grow your business.' }
      ]
    }
  },
  components: {
    PageHeader
  },
  async asyncData (context) {
    return axios.get(context.store.state.ajaxurl + '/wp/v2/pages?slug=' + context.params.section)
      .then((res) => {
        if (res.data.length > 0) {
          return {
            page: res.data[0],
            title: res.data[0].formatted_title
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
