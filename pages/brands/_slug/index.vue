<template>
  <div>
    <main class="container single-brands">
      <article>
        <div class="row">
          <div class="main col-10 offset-1 offset-sm-2 col-sm-8 offset-lg-0 col-lg-4">
            <img v-bind:src="data.featuredimage.logo.src" v-bind:srcset="data.featuredimage.logo.srcset" />
            <h2>{{data.subheadline}}</h2>
            <span v-html="data.brandinfo"></span>
          </div>
          <div class="image col-10 offset-1 offset-sm-0 col-sm-6 col-lg-4">
            <img v-for="(hero, index) in data.featuredimage.hero" :src="hero.src" :srcset="hero.srcset" v-if="index === slide" />
          </div>
          <div class="side col-10 offset-1 offset-sm-0 col-sm-6 col-lg-4">
            <h3>Product Information</h3>
              <span v-html="data.productinfo"></span>
              <span v-if="data.datasheet.url">
                <h4>Product Sheet:</h4>
                <i class="icon-download"></i> <a v-bind:href="data.datasheet.url" title="Download product sheet">Download ({{data.datasheet.extension}})</a>
              </span>
              <span v-if="data.website">
                <h4>Full brand site:</h4>
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
              <div class="footnote" v-if="this.footnote" v-html="this.footnote"></div>
          </div>
        </div>
      </article>
      <div class="row grid" v-if="posts">
        <Story
          v-for="(post, index) in posts"
          :data="post"
          :key="index"
        ></Story>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import Story from '~/components/Story.vue'

export default {
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.data.subheadline }
      ]
    }
  },
  components: {
    Story
  },
  computed: {
    footnote () {
      return this.data.footnote || false
    },
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
      data: {},
      posts: [],
      slide: 0,
      timer: null
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
    ticker: function () {
      if (this.slide === this.data.featuredimage.hero.length - 1) {
        this.slide = 0
      } else {
        this.slide++
      }
      this.timer = setTimeout(this.ticker, 3000)
    }
  },
  mounted () {
    this.ticker()
    axios.get(this.$store.state.ajaxurl + '/wp/v2/posts?taxonomy=brands&per_page=30&term=' + this.data.brandtag).then((response) => {
      this.posts = response.data
    }).catch((error) => {
      console.log(error.request)
    })
  },
  beforeDestory () {
    clearTimeout(this.timer)
  },
  async asyncData (context) {
    let { data } = await axios.get(context.store.state.ajaxurl + '/wp/v2/brands/?slug=' + context.params.slug)
    return {
      data: data[0],
      title: data[0].formatted_title
    }
  }
}
</script>
