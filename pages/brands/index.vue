<template>
  <div>
    <SiteHeader></SiteHeader>
    <main class="container archive-brands">
      <ul class="nav filter">
        <li v-on:click="filter = false" :class="{active: filter === false}">All</a></li>
        <li v-for="type in types" v-on:click="filter = type.id" :class="{active: filter === type.id}">{{cleanName(type.name)}}</li>
      </ul>
      <transition-group name="brand" tag="div" class="grid row">
         <nuxt-link :to="'/brands/' + brand.slug " v-for="(brand, index) in brands" class="col-12 col-sm-6 col-md-4" v-on:click="" v-if="filter === brand.brandtype[0].term_id || filter == false" :key="index">
          <article>
            <div class="overlay" :style="'background-color: ' + brand.brandcolour"></div>
            <div class="logo">
              <CustomImg :src="brand.featuredimage.logo.src" :srcset="brand.featuredimage.logo.srcset" />
            </div>
            <CustomImg :src="brand.featuredimage.backdrop.src" :srcset="brand.featuredimage.backdrop.srcset" class="backdrop" />
            <CustomImg :src="brand.featuredimage.range.src" :srcset="brand.featuredimage.range.srcset" class="range" />
          </article>
        </nuxt-link>
      </transition-group>
    </main>
    <SiteFooter></SiteFooter>
  </div>
</template>

<script>
import axios from 'axios'
import SiteFooter from '~/components/SiteFooter.vue'
import SiteHeader from '~/components/SiteHeader.vue'
import CustomImg from '~/components/CustomImg.vue'

export default {
  components: {
    SiteHeader,
    SiteFooter,
    CustomImg
  },
  data () {
    return {
      filter: false
    }
  },
  computed: {
    types () {
      var types = []
      this.brands.forEach(function (brand) {
        types.push({
          name: brand.brandtype[0].name,
          id: brand.brandtype[0].term_id
        })
      })
      // Dedupe
      var uniq = new Set(types.map(e => JSON.stringify(e)))
      return Array.from(uniq).map(e => JSON.parse(e))
    }
  },
  updated () {
  },
  methods: {
    cleanName (name) {
      return name.replace(/&amp;/g, '&')
    }
  },
  async asyncData (context) {
    let { data } = await axios.get(context.store.state.ajaxurl + '/wp/v2/brands?per_page=99')
    return {
      brands: data
    }
  }
}
</script>
