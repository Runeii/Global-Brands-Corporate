<template>
  <main class="container single-post single-interview">
    <article>
      <i class="close custom-icon-cross h1" v-on:click="close"></i>
      <div class="post col-12 col-md-10 col-lg-8">
        <img src="~static/img/logo-colour.png" class="col-6 col-lg-4 watermark" />
        <h1 v-html="details.name"></h1>
        <p class="location h3">{{details.title}}</p>
        <div class="content" v-html="fullContent"></div>
        <ul class="footer">
          <SocialLinks :story="data" />
        </ul>
      </div>
    </article>
  </main>
</template>

<script>
import axios from 'axios'
import SocialLinks from '~/components/SocialLinks.vue'

export default {
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'Interview with ' + this.title }
      ]
    }
  },
  components: {
    SocialLinks
  },
  computed: {
    fullContent () {
      if (this.data.featuredimage) {
        let image = '<img src="' + this.data.featuredimage.src + '" class="headshot" />'
        return image + this.data.content.rendered
      } else {
        return this.data.content.rendered
      }
    },
    details () {
      let split = this.data.title.rendered.split(' &#8211; ')
      if (split.length < 2) {
        let title = this.data.title.rendered.replace(/\u2013|\u2014/g, '-')
        split = title.split(' - ')
      }
      return {
        name: split[0],
        title: split[1]
      }
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
    let { data } = await axios.get(context.store.state.ajaxurl + '/wp/v2/staff_interviews/?slug=' + context.params.slug)
    return {
      data: data[0],
      title: data[0].formatted_title
    }
  }
}
</script>
