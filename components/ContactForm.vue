<template>
  <div class="pageheader">
    <img :src="data.featuredimage.src" :srcset="data.featuredimage.srcset" v-if="data.featuredimage" />
    <div class="overlay" v-html="data.content.rendered"></div>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>
