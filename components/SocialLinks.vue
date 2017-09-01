<template>
  <li class="social">
    <a :href="'https://twitter.com/intent/tweet?text=' + message">
      <i class="icon-twitter"></i>
    </a>
    <a :href="'https://www.facebook.com/sharer/sharer.php?u=' + url">
      <i class="icon-facebook-official"></i>
    </a>
    <a :href="'https://plus.google.com/share?url=' + message">
      <i class="icon-gplus"></i>
    </a>
    <a :href="'http://www.linkedin.com/shareArticle?mini=true&url=&title=&summary=' + message">
      <i class="icon-linkedin-squared"></i>
    </a>
  </li>
</template>

<script>
export default {
  props: ['story'],
  computed: {
    message () {
      return encodeURI(this.story.title.rendered + ' ' + this.url + ' via Global Brands')
    },
    url () {
      return 'https://www.globalbrands.co.uk/' + this.$nuxt.$route.path
    }
  }
}
</script>
