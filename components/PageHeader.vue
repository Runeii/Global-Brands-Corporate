<template>
  <div class="pageheader">
    <img v-if="data.featuredimage.src" :src="data.featuredimage.src" :srcset="data.featuredimage.srcset" class="main" />
    <img v-else src="http://via.placeholder.com/1130x500" class="main" />
    <div class="overlay" v-html="data.content.rendered"></div>
    <div class="additional" :class="{double: data.additionalimages.right.src}" v-if="data.additionalimages">
      <img v-if="data.additionalimages.left.src" :src="data.additionalimages.left.src" :srcset="data.additionalimages.left.srcset" class="additional_left" />
      <img v-if="data.additionalimages.right.src" :src="data.additionalimages.right.src" :srcset="data.additionalimages.right.srcset" class="additional_right" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>
