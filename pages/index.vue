<template>
  <div class="home" ref="home">
    <main class="container">
      <div class="grid row">
        <Story
          v-for="(post, index) in posts"
          :data="post"
          :wide="isWide(index)"
          :key="index"
        ></Story>
      </div>
    </main>
  </div>
</template>

<script>
import Story from '~/components/Story.vue'
import axios from 'axios'

export default {
  components: {
    Story
  },
  methods: {
    isWide: function (index) {
      if (index === 0 || index === 6) {
        return true
      } else {
        return false
      }
    }
  },
  async asyncData (context) {
    let { data } = await axios.get(context.store.state.ajaxurl + '/wp/v2/posts?per_page=5&sticky=true')
    let portfolio = {
      brand_details: {
        brand_colour: '#4a5864'
      },
      featuredimage: {
        loopset: false,
        src: 'https://www.globalbrands.co.uk/cms/wp-content/uploads/2017/09/GB-PRODUCT-RANGE-SHOT-1144-no2-370x370.jpg'
      },
      subheadline: 'Our comprehensive range of premium and high energy brands',
      title: {
        rendered: 'Brand Portfolio'
      },
      permalink: '/brands',
      isStatic: true
    }
    let messages = {
      brand_details: {
        brand_colour: '#8a6f8d'
      },
      featuredimage: {
        loopset: false,
        src: 'https://www.globalbrands.co.uk/cms/wp-content/uploads/2017/09/Heart-of-global-brands-article-pic-370x370.jpg'
      },
      title: {
        rendered: 'At the heart of Global Brands'
      },
      permalink: '/at-the-heart-of-global-brands',
      isStatic: true
    }
    data.splice(2, 0, portfolio)
    data.splice(4, 0, messages)

    return { posts: data }
  }
}
</script>
