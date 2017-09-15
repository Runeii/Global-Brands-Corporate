<template>
  <nuxt-link v-if="filtered" :to="permalink" :class="classList">
    <article>
      <div class="overlay" :style="'background-color: ' + data.brand_details.brand_colour"></div>
      <CustomImg :src="imageSrc" :width="size[0]" :height="size[1]" :id="data.id" :srcset="imageSrcset" :title="data.title.rendered" :style="'background-color: ' + data.brand_details.brand_colour" />
      <div class="meta">
        <h2 :class="size[2]" v-html="data.title.rendered"></h2>
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
      if (this.$props.wide === true) {
        if (this.data.featuredimage.loop_wide) {
          return this.data.featuredimage.loop_wide[0]
        } else {
          return this.data.featuredimage.src
        }
      } else {
        if (this.data.featuredimage.loop) {
          return this.data.featuredimage.loop[0]
        } else {
          return this.data.featuredimage.src
        }
      }
    },
    imageSrcset () {
      if (this.$props.wide === true) {
        if (this.data.featuredimage.loop_wideset) {
          return this.data.featuredimage.loop_wideset
        } else {
          return this.data.featuredimage.srcset
        }
      } else {
        if (this.data.featuredimage.loopset) {
          return this.data.featuredimage.loopset
        } else {
          return this.data.featuredimage.srcset
        }
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
