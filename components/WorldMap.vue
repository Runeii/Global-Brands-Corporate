<template>
  <div id="worldmap">
    <ul class="submenu" :class="active">
      <li v-for="(countries, continent) in continents" v-on:mouseover="highlight(continent)" :class="continent">{{continent}}</li>
    </ul>
    <div class="map row">
      <transition-group name="fact-enter" tag="div" mode="out-in" class="copy col-12">
        <h4 v-for="(fact, index) in factList" :key="index" class="fact"> {{fact}} </h4>
      </transition-group>
      <transition name="list-enter">
        <div class="countrylist col-12 col-lg-3" v-if="stage === 0 || stage === 1">
          <li v-for="(country, index) in firstlist" :key="index">{{country}}</li>
        </div>
        <div class="countrylist col-12 col-lg-3" v-if="stage === 2">
          <li v-for="(country, index) in altlist" :key="index">{{country}}</li>
        </div>
      </transition>
      <span v-if="svgData" class="col-12 col-lg-9" :class="active" v-html="svgData" ref="worldmap" v-on:mouseover="hoverHighlight(this, $event)"></span>
    </div>
    <div class="mobile row" v-for="(countries, continent) in continents">
      <h4 class="col-4 offset-1">{{continent}}</h4>
      <ul class="col-7 list">
        <li v-for="(country, index) in countries.countries" :key="index">{{country}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const worldmap = require('~/static/img/worldmap.svg')
export default {
  computed: {
    factList () {
      if (this.active === false) {
        return []
      } else {
        return this.continents[this.active].fact
      }
    }
  },
  data () {
    return {
      active: false,
      stage: 0,
      firstlist: [],
      altlist: [],
      continents: {
        'americas': {
          countries: ['Bermuda', 'Canada', 'Colombia', 'Costa Rica', 'El Salvador', 'Guatemala', 'Honduras', 'Mexico', 'Nicaragua', 'West Indies'],
          fact: ['Hooper\'s is our most popular brand in North America', 'Franklin & Sons is our most popular brand in Colombia']
        },
        'europe': {
          countries: ['Austria', 'Belgium', 'Bulgaria', 'Canary Islands', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Gibraltar', 'Greece', 'Guernsey', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Jersey', 'Latvia', 'Lithuania', 'Luxemburg', 'Mallorca', 'Malta', 'Norway', 'Russia', 'Spain', 'Sweden'],
          fact: ['Products solid in 23 European countries', 'Franklin & Sons is the most popular brand']
        },
        'africa': {
          countries: ['Benin', 'Cameroon', 'Nigeria', 'Seychelles'],
          fact: ['VK is our most popular brand in Africa', '']
        },
        'asia': {
          countries: ['Bahrain', 'Hong Kong', 'India', 'Japan', 'Jordan', 'Malaysia', 'Oman', 'Qatar', 'Singapore', 'South Korea', 'Taiwan', 'UAE'],
          fact: ['Currently solid in 12 Asian countries', 'Japan is our second largest market, selling VK, Jungfrau and Amigos']
        }
      },
      svgData: false,
      offset: 0,
      set: ['americas', 'europe', 'africa', 'asia'],
      timer: ''
    }
  },
  methods: {
    highlight: function (continent) {
      clearTimeout(this.timer)
      this.active = continent
    },
    hoverHighlight: function (el, event) {
      if (event.target.tagName === 'path') {
        if (event.target.classList.value && event.target.classList.value !== '') {
          this.highlight(event.target.classList.value)
        }
      }
    },
    ticker: function () {
      this.active = this.set[this.offset]
      if (this.offset === this.set.length - 1) {
        this.offset = 0
      } else {
        this.offset++
      }
      this.timer = setTimeout(this.ticker, 3000)
    },
    swapLists: function (newContinent) {
      if (this.stage === 0) {
        this.firstlist = this.continents[newContinent].countries
        this.stage = 1
      } else if (this.stage === 1) {
        this.altlist = this.continents[newContinent].countries
        this.stage = 2
      } else if (this.stage === 2) {
        this.firstlist = this.continents[newContinent].countries
        this.stage = 1
      }
    }
  },
  watch: {
    active: function (newContinent) {
      this.swapLists(newContinent)
    }
  },
  mounted () {
    axios.get(worldmap)
      .then((res) => {
        this.svgData = res.data
        this.ticker()
      })
  }
}
</script>
