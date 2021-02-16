<template>
  <div>
    <main class="container single-post">
      <article>
        <i class="close custom-icon-cross h1" v-on:click="close"></i>
        <div class="post col-12 col-md-10 col-lg-8">
          <ul class="meta">
            <li class="date">Added: {{postdate}}</li>
            <li class="category">{{data.categories_extended[0].name}}</li>
          </ul>
          <h1 v-html="data.title.rendered"></h1>
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
  </div>
</template>

<script>
import axios from 'axios'
import {format, parseISO} from 'date-fns'
import SocialLinks from '~/components/SocialLinks.vue'

export default {
  head () {
    return {
      title: this.title,
      meta: [
        { vmid: 'og:title', property: 'og:title', content: this.title },
        { hid: 'description', name: 'description', content: this.description },
        { vmid: 'og:description', property: 'og:description', content: this.description },
        { vmid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
        { vmid: 'twitter:title', property: 'twitter:title', content: this.title },
        { vmid: 'twitter:description', property: 'twitter:description', content: this.description },
        { vmid: 'og:image', property: 'og:image', content: this.social_image_src },
        { vmid: 'og:image:width', property: 'og:image:width', content: this.social_image_width },
        { vmid: 'og:image:height', property: 'og:image:height', content: this.social_image_height },
        { vmid: 'twitter:image', property: 'twitter:image', content: this.social_image_src }
      ]
    }
  },
  components: {
    SocialLinks
  },
  computed: {
    postdate: function () {
      var newdate = parseISO(this.data.date)
      return format(newdate, 'Do MMMM yyyy')
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
    return {
      data: data[0],
      title: data[0].formatted_title,
      description: data[0].subheadline,
      social_image_src: data[0].featuredimage.src,
      social_image_height: data[0].featuredimage.height,
      social_image_width: data[0].featuredimage.width
    }
  }
}
</script>
