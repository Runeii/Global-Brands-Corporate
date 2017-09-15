<template>
  <div id="steve">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-10 offset-lg-1 heading h3cont">
          <h2>Steve Perez</h2><h3>Chairman</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-7 offset-lg-1 col-lg-6">
          <PageHeader :data="header" class="h2"></PageHeader>
          <div class="content" v-html="data.content.rendered"></div>
          <ul class="social">
            <li><a href="http://www.steveperez.co.uk">www.steveperez.co.uk</a></li>
            <li><a href="https://www.instagram.com/steveperezrallyteam/"><i class="icon-instagram"></i></a></li>
            <li><a href="https://www.facebook.com/Steve-Perez-Rally-Team-1468784436672291"><i class="icon-facebook-official"></i></a></li>
            <li><a href="https://twitter.com/StevenJGPerez"><i class="icon-twitter"></i></a></li>
          </ul>
        </div>
        <div class="col-12 col-md-5 col-lg-3 offset-lg-1 images">
          <img v-for="image in data.right_hand_images" :src="image[0]" :width="image[1]" :height="image[2]" class="right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '~/components/PageHeader.vue'
export default {
  computed: {
    header () {
      return {
        featuredimage: this.$props.data.featuredimage,
        content: {
          rendered: 'A man with a van'
        }
      }
    }
  },
  components: {
    PageHeader
  },
  methods: {
  },
  props: ['data']
}
</script>
