<template>
  <div class="news">
    <main class="container">
      <ul class="nav filter">
        <li v-on:click="filter = false" :class="{active: filter === false}">All</a></li>
        <li v-for="type in types" v-on:click="filter = type.id" :class="{active: filter === type.id}">{{type.name}}</li>
      </ul>
      <div class="grid row">
        <Story
          v-for="(post, index) in filteredPosts"
          :data="post"
          :wide="isWide(index)"
          :key="index"
          :filter="filter"
        ></Story>
      </div>
    </main>
  </div>
</template>

<script>
import Story from '~/components/Story.vue'
import axios from 'axios'

var throttle = require('lodash.throttle')

export default {
  head () {
    return {
      title: 'News',
      meta: [
        { hid: 'description', name: 'description', content: 'Latest news, stories and updates from Global Brands and its brands.' }
      ]
    }
  },
  components: {
    Story
  },
  data () {
    return {
      filter: false,
      page: 2,
      loading: false
    }
  },
  computed: {
    dimensions () {
      return {
        screenHeight: window.innerHeight,
        documentHeight: document.body.clientHeight
      }
    },
    filteredPosts () {
      if (this.filter !== false) {
        let filter = this.filter
        return this.posts.filter(function (post) {
          return post.categories_extended[0].term_id === filter
        })
      } else {
        return this.posts
      }
    },
    types () {
      var types = []
      this.posts.forEach(function (post) {
        post.categories_extended.catalogue = []
        post.categories_extended.forEach(function (cat) {
          types.push({
            name: cat.name,
            id: cat.term_id
          })
          post.categories_extended.catalogue.push(cat.term_id)
        })
      })
      // Dedupe
      var uniq = new Set(types.map(e => JSON.stringify(e)))
      return Array.from(uniq).map(e => JSON.parse(e))
    }
  },
  methods: {
    isWide: function (index) {
      let blockpage = Math.floor(index / 10)
      let offsetone = 0 + (blockpage * 10)
      let offsettwo = 6 + (blockpage * 10)
      if (index === offsetone || index === offsettwo) {
        return true
      } else {
        return false
      }
    },
    infiniteScroll (event) {
      if (this.loading === false && this.page !== false && getScrollY() >= ((document.body.clientHeight - window.innerHeight) - 200)) {
        this.loading = true
        axios.get(this.$store.state.ajaxurl + '/wp/v2/posts?page=' + this.page)
          .then(response => {
            if (response.data.status === 400) {
              this.page = false
              this.loading = false
            } else {
              this.posts = this.posts.concat(response.data)
              this.page++
              this.loading = false
            }
          })
      }
    }
  },
  mounted: function () {
    window.addEventListener('scroll', throttle((event) => { this.infiniteScroll(event) }, 250), {
      passive: true
    })
  },
  destroyed: function () {
    window.removeEventListener('scroll', throttle((event) => { this.infiniteScroll(event) }, 250), {
      passive: true
    })
  },
  async asyncData (context) {
    let { data } = await axios.get(context.store.state.ajaxurl + '/wp/v2/posts?per_page=10')
    return { posts: data }
  }
}
function getScrollY () {
  return window.scrollY || window.pageYOffset || document.body.scrollTop
}
</script>
