<template>
  <div>
    <SiteHeader></SiteHeader>
    <main class="container single-post">
      <article>
        <i class="close custom-icon-cross h1" v-on:click="close"></i>
        <div class="post col-12 col-md-10 col-lg-8">
          <h1 v-html="page.title.rendered"></h1>
          <img v-bind:src="page.featuredimage.src" v-bind:srcset="page.featuredimage.srcset" class="page" />
          <div class="content" v-html="page.content.rendered"></div>
        </div>
      </article>
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
  methods: {
    close: function () {
      this.$router.go(-1)
    }
  },
  async asyncData (context) {
    return axios.get(context.store.state.ajaxurl + '/wp/v2/pages?slug=' + context.params.page)
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
        context.error({ statusCode: error.response.status, message: error.response.data.message })
      })
  }
}
</script>
