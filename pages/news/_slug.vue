<template>
  <div>
    <SiteHeader></SiteHeader>
    <main class="container single-post">
      <article>
        <i class="close custom-icon-cross h1" v-on:click="close"></i>
        <div class="post col-12 col-md-10 col-lg-8">
          <ul class="meta">
            <li class="date">Added: {{postdate}}</li>
            <li class="category">{{data.categories_extended[0].name}}</li>
          </ul>
          <h1>{{data.title.rendered}}</h1>
          <img v-if="data.featuredimage.src" v-bind:src="data.featuredimage.src" v-bind:srcset="data.featuredimage.srcset" class="page" />
          <div class="content" v-html="data.content.rendered"></div>
          <ul class="footer">
            <li class="attachment" v-if="data.file_attachment.url">
              <a v-bind:href="data.file_attachment.url" v-bind:title="'Download story attachment ' + data.file_attachment.name">
                <i class="icon-download"></i> Download ({{data.file_attachment.extension}})
              </a>
            </li>
            <SocialLinks :story="data" />
          </ul>
        </div>
      </article>
    </main>
    <SiteFooter></SiteFooter>
  </div>
</template>

<script>
import axios from 'axios'
import {format, parse} from 'date-fns'
import SiteHeader from '~/components/SiteHeader.vue'
import SiteFooter from '~/components/SiteFooter.vue'
import SocialLinks from '~/components/SocialLinks.vue'

export default {
  components: {
    SiteHeader,
    SiteFooter,
    SocialLinks
  },
  computed: {
    postdate: function () {
      var newdate = parse(this.data.date)
      return format(newdate, 'Do MMMM YYYY')
    }
  },
  methods: {
    close: function () {
      this.$router.go(-1)
    },
    isWide: function (index) {
      if (index === 0 || index === 6) {
        return true
      } else {
        return false
      }
    }
  },
  async asyncData (context) {
    let { data } = await axios.get(context.store.state.ajaxurl + '/wp/v2/posts/?slug=' + context.params.slug)
    return { data: data[0] }
  }
}
</script>
