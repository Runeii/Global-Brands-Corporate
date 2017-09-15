<template>
    <main class="container archive-brands">
      <ul class="nav filter">
        <li v-on:click="filter = false" :class="{active: filter === false}" style="order: 0">All</li>
        <li v-for="type in types" v-on:click="filter = type.id" :class="{active: filter === type.id}" :style="'order: ' + type.order">{{cleanName(type.name)}}</li>
      </ul>
      <div class="nav filter mobile h3">
        <select v-model="filter" v-on:change="filter = mobile_filter.selected">
          <option :value="false" :class="{active: filter === false}">All</option>
          <option v-for="type in types" :value="type.id" :class="{active: filter === type.id}">{{cleanName(type.name)}}</option>
        </select>
      </div>
      <transition-group name="brand" tag="div" class="grid row">
         <nuxt-link :to="'/brands/' + brand.slug " v-for="(brand, index) in filteredBrands" class="col-6 col-md-4" :key="index">
          <article>
            <div class="overlay" :style="'background-color: ' + brand.brandcolour"></div>
            <div class="logo">
              <CustomImg :src="brand.featuredimage.logo.src" :id="brand.id + '_logo'" />
            </div>
            <CustomImg :src="brand.featuredimage.backdrop.src" class="backdrop" :id="brand.id + '_backdrop'" width="370" height="370" />
            <CustomImg :src="brand.featuredimage.range.src" class="range" :id="brand.id + '_range'" width="370" height="370" />
          </article>
        </nuxt-link>
      </transition-group>
    </main>
</template>

<script>
import axios from 'axios'
import CustomImg from '~/components/CustomImg.vue'

export default {
  head () {
    return {
      title: 'Brands',
      meta: [
        { hid: 'description', name: 'description', content: 'Our comprehensive range of premium and high energy brands' }
      ]
    }
  },
  components: {
    CustomImg
  },
  data () {
    return {
      filter: false
    }
  },
  computed: {
    filteredBrands () {
      if (this.filter !== false) {
        let filter = this.filter
        return this.brands.filter(function (brand) {
          return brand.brandtype[0].term_id === filter
        })
      } else {
        return this.brands
      }
    },
    types () {
      var types = []
      this.brands.forEach(function (brand) {
        types.push({
          name: brand.brandtype[0].name,
          id: brand.brandtype[0].term_id,
          order: brand.brandtype[0].description
        })
      })
      // Dedupe
      var uniq = new Set(types.map(e => JSON.stringify(e)))
      return Array.from(uniq).map(e => JSON.parse(e))
    }
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
