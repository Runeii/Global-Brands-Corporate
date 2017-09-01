<template>
  <nuxt-link v-if="filtered" :to="permalink" :class="classList">
    <article>
      <div class="overlay" :style="'background-color: ' + data.brandcolour"></div>
      <CustomImg :src="imageSrc" :width="size[0]" :height="size[1]" :srcset="data.featuredimage.loopset" :title="data.title.rendered" :style="'background-color: ' + data.brandcolour" />
      <div class="meta">
        <h2 :class="size[2]">{{data.title.rendered}}</h2>
        <p>{{data.subheadline}}</p>
      </div>
    </article>
  </nuxt-link>
</template>

<script>
import CustomImg from '~/components/CustomImg.vue'
export default {
  props: ['data', 'wide', 'filter'],
  components: {
    CustomImg
  },
  computed: {
    classList () {
      if (this.$props.wide === true) {
        return 'col-12 col-sm-6 col-lg-8 wide'
      } else if (this.$props.data.isStatic === true) {
        return 'col-12 col-sm-6 col-lg-4 static'
      } else {
        return 'col-12 col-sm-6 col-lg-4'
      }
    },
    filtered () {
      if (!this.$props.filter || this.$props.filter === false) {
        return true
      } else if (this.$props.data.categories_extended.catalogue.includes(this.$props.filter)) {
        return true
      } else {
        return false
      }
    },
    imageSrc () {
      if (this.data.featuredimage.loop) {
        return this.data.featuredimage.loop[0]
      } else {
        return this.data.featuredimage.src
      }
    },
    permalink () {
      if (this.$props.data.slug) {
        return '/news/' + this.$props.data.slug
      } else {
        return this.$props.data.permalink
      }
    },
    size () {
      if (this.$props.wide === true) {
        return [730, 350, 'h1']
      } else {
        return [350, 350]
      }
    }
  }
}
</script>
