<template>
  <div id="timeline">
    <div class="intro col-12 col-md-8 offset-md-2">
      <h2>Our History</h2>
      <p>Established in 1997 by entrepreneur Steve Perez, Global Brands has grown to become one of the country’s leading independent drinks businesses. We continue to develop and diversify our offering, adding to our range of products across the premium spirits, tonics, mixers, soft drinks, RTDs and beer categories. Our 17 brands are sold in 55 countries worldwide.</p>
    </div>
    <div class="holder col-12">
      <ol class="stream" :style="{width: width + '%', marginLeft: marginOffset}">
        <li v-for="milestone in milestones" :style="{width: slideWidth + '%'}">
          <div class="overlay"></div>
          <img :src="background(milestone).src" :srcset="background(milestone).srcset" class="background" />
          <div class="col-5 col-md-7 image">
            <img :src="milestone.featuredimage.src" :srcset="milestone.featuredimage.srcset" />
          </div>
          <div class="col-7 col-md-5 title">
            <h3 class="h1">{{date(milestone.post_date)}}</h3>
            <p class="h4">{{milestone.post_title}}</p>
          </div>
      </li>
      </ol>
    </div>
    <ol class="dates">
      <li v-for="(milestone, index) in milestones" :class="{active: offset === index}" v-on:mouseover="offset = index"><h3 class="h4">{{date(milestone.post_date)}}</h3></li>
    </ol>
  </div>
</template>

<script>
import {format, parseISO} from 'date-fns'
export default {
  data () {
    return {
      offset: 0
    }
  },
  computed: {
    marginOffset () {
      return (this.offset * -100) + '%'
    },
    width () {
      return this.$props.milestones.length * 100
    },
    slideWidth () {
      return 100 / this.$props.milestones.length
    }
  },
  methods: {
    background (milestone) {
      if (milestone.background.src === null) {
        return {
          src: milestone.featuredimage.src,
          srcset: milestone.featuredimage.src
        }
      } else {
        return milestone.background
      }
    },
    date: function (date) {
      var newdate = parseISO(date)
      return format(newdate, 'yyyy')
    }
  },
  props: ['milestones']
}
</script>
