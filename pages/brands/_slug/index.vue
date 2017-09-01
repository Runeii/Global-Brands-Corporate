<template>
  <div>
    <SiteHeader></SiteHeader>
    <main class="container single-brands">
      <article>
        <div class="row">
          <div class="main col-10 offset-1 offset-sm-2 col-sm-8 offset-lg-0 col-lg-4">
            <img v-bind:src="data.featuredimage.logo.src" v-bind:srcset="data.featuredimage.logo.srcset" />
            <h2>{{data.subheadline}}</h2>
            <span v-html="data.brandinfo"></span>
          </div>
          <div class="image col-10 offset-1 offset-sm-0 col-sm-6 col-lg-4">
            <img v-bind:src="data.featuredimage.product.src" v-bind:srcset="data.featuredimage.product.srcset" />
          </div>
          <div class="side col-10 offset-1 offset-sm-0 col-sm-6 col-lg-4">
            <h3>Product Information</h3>
              <span v-html="data.productinfo"></span>
              <span v-if="data.datasheet.url">
                <h4>Product Sheet:</h4>
                <i class="icon-download"></i> <a v-bind:href="data.datasheet.url" title="Download product sheet">Download ({{data.datasheet.extension}})</a>
              </span>
              <span v-if="data.website">
                <h4>Consumer site:</h4>
                <a :href="'http://' + data.website" id="consumerurl" title="">{{data.website}}</a>
              </span>
              <div class="social">
                <a :href="data.social.instagram" v-if="data.social.instagram">
                  <i class="icon-instagram h2"></i>
                </a>
                <a :href="data.social.facebook" v-if="data.social.facebook">
                  <i class="icon-facebook-official h2"></i>
                </a>
                <a :href="data.social.twitter" v-if="data.social.twitter">
                  <i class="icon-twitter h2"></i>
                </a>
              </div>
          </div>
        </div>
      </article>
      <div class="row posts" v-if="posts">
        <nuxt-link v-for="post in posts" :to="'/brands/' + $nuxt.$route.params.slug + '/' + post.slug" class="col-10 offset-1 offset-sm-0 col-sm-6 col-lg-4" :key="post.id">
          <article>
            <img :srcset="imageSrcset(post.featured_media)" />
            <div class="meta">
              <h4 v-html="post.title.rendered"></h4>
            </div>
          </article>
        </nuxt-link>
      </div>
    </main>
    <SiteFooter></SiteFooter>
  </div>
</template>

<script>
import axios from 'axios'
import SiteHeader from '~/components/SiteHeader.vue'
import SiteFooter from '~/components/SiteFooter.vue'

export default {
  components: {
    SiteHeader,
    SiteFooter
  },
  computed: {
    url () {
      let url = this.data.website
      if (url.endsWith('/')) {
        url = url.slice(0, -1)
      }
      if (url.startsWith('http://')) {
        url = url.slice(0, 7)
      }
      if (url.startsWith('https://')) {
        url = url.slice(0, 8)
      }
      return url
    },
    urlWithHttp () {
      let url = this.data.website
      if (url.endsWith('/')) {
        url = url.slice(0, -1)
      }
      if (url.startsWith('http://')) {
        return url
      } else if (url.startsWith('https://')) {
        return url
      } else {
        return 'http://' + url
      }
    }
  },
  data () {
    return {
      posts: [],
      media: {}
    }
  },
  methods: {
    close: function () {
      this.$nuxt.$router.go(1)
    },
    isWide: function (index) {
      if (index === 0 || index === 6) {
        return true
      } else {
        return false
      }
    },
    imageSrc: function (id) {
      return this.media[id].source_url
    },
    imageSrcset: function (id) {
      let srcset = ''
      Object.keys(this.media[id].media_details.sizes).forEach(size => {
        let current = this.media[id].media_details.sizes[size]
        srcset += current.source_url + ' ' + current.width + 'w, '
      })
      return srcset
    }
  },
  mounted () {
    axios.get(this.urlWithHttp + '/wp-json/wp/v2/posts').then((response) => {
      if (response.data.length > 0) {
        let lookup = []
        for (var i = 0, len = response.data.length; i < len; i++) {
          lookup.push(response.data[i].featured_media)
        }
        axios.get(this.urlWithHttp + '/wp-json/wp/v2/media?include=' + lookup.join()).then((attachments) => {
          for (var i = 0, len = attachments.data.length; i < len; i++) {
            this.media[attachments.data[i].id] = attachments.data[i]
          }
          this.posts = response.data
        })
      }
    }).catch((error) => {
      console.log(error.request)
    })
  },
  async asyncData (context) {
    let { data } = await axios.get(context.store.state.ajaxurl + '/wp/v2/brands/?slug=' + context.params.slug)
    return { data: data[0] }
  }
}
</script>
