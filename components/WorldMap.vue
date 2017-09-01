<template>
  <div id="worldmap">
    <ul class="submenu">
      <li v-for="continent in continents" v-on:mouseover="highlight(continent)" v-on:mouseout="removeHighlight()">{{continent.name}}</li>
    </ul>
    <div class="map row">
      <ul class="countrylist col-12 col-sm-3">
        <transition-group name="staggered-fade" v-if="countryList">
          <li v-for="(country, index) in countryList" :key="index">{{country}}</li>
        </transition-group>
      </ul>
      <span v-if="svgData" class="col-12 col-md-9" :class="active.class" v-html="svgData"> </span>
    </div>
    <div class="mobile row" v-for="continent in continents">
      <h4 class="col-4 offset-1">{{continent.name}}</h4>
      <ul class="col-7 list">
        <li v-for="(country, index) in continent.countries" :key="index">{{country}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const worldmap = require('~/static/img/worldmap.svg')
export default {
  data () {
    return {
      active: {
        name: '',
        class: '',
        countries: []
      },
      countryList: [],
      continents: [
        {
          name: 'Americas',
          class: 'americas',
          countries: ['Bermuda', 'Canada', 'Colombia', 'Costa Rica', 'El Salvador', 'Guatemala', 'Honduras', 'Mexico', 'Nicaragua', 'West Indies']
        },
        {
          name: 'Europe',
          class: 'europe',
          countries: ['Austria', 'Belgium', 'Bulgaria', 'Canary Islands', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Gibraltar', 'Greece', 'Guernsey', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Jersey', 'Latvia', 'Lithuania', 'Luxemburg', 'Mallorca', 'Malta', 'Norway', 'Russia', 'Spain', 'Sweden']
        },
        {
          name: 'Africa',
          class: 'africa',
          countries: ['Benin', 'Cameroon', 'Nigeria', 'Seychelles']
        },
        {
          name: 'Asia',
          class: 'asia',
          countries: ['Bahrain', 'Hong Kong', 'India', 'Japan', 'Jordan', 'Malaysia', 'Oman', 'Qatar', 'Singapore', 'South Korea', 'Taiwan', 'UAE']
        }
      ],
      svgData: false,
      ticker: 0
    }
  },
  methods: {
    highlight: function (continent) {
      this.active = continent
    },
    removeHighlight: function () {
      this.active = {
        name: '',
        class: '',
        countries: []
      }
    }
  },
  mounted () {
    axios.get(worldmap)
      .then((res) => {
        this.svgData = res.data
      })
  },
  watch: {
    active: function (val) {
      let countrylist = this.countryList = []
      for (var i = 0, len = val.countries.length; i < len; i++) {
        let delay = i * 50
        let country = val.countries[i]
        setTimeout(function () {
          countrylist.push(country)
        }, delay)
      }
    }
  }
}
</script>
