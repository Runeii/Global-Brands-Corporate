<template>
  <div class="pageheader">
    <img  v-if="data.featuredimage" :src="data.featuredimage.src" :srcset="data.featuredimage.srcset" />
    <div class="overlay" v-html="data.content.rendered"></div>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>
