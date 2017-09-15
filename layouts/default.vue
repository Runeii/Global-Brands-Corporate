<template>
  <span :class="$nuxt.$route.name">
    <SiteHeader ref="header"></SiteHeader>
    <nuxt :class="$nuxt.$store.menuStatus" />
    <SiteFooter></SiteFooter>
  </span>
</template>
<script>
import SiteHeader from '~/components/SiteHeader.vue'
import SiteFooter from '~/components/SiteFooter.vue'
export default {
  components: {
    SiteHeader,
    SiteFooter
  }
}
</script>
