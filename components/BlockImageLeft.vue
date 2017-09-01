<template>
  <div class="blockleft">
    <h2 class="col-12 offset-lg-1 col-lg-11">{{title}}</h2>
    <article v-for="(entry, index) in data" class="row" :key="index">
      <img :src="entry.featuredimage.src" :srcset="entry.featuredimage.srcset" class="col-6 offset-3 col-md-4 offset-md-0 col-lg-3 offset-lg-1" />
      <div class="content col-10 offset-1 col-md-7 offset-md-0 col-lg-6">
        <h3 v-html="entry.post_title"></h3>
        <span v-html="entry.content.rendered"></span>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: ['data', 'title']
}
</script>
