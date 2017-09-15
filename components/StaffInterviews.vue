<template>
  <div class="blockleft interviews">
    <h2 class="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12">Hear more about working here from the people who do…</h2>
    <nuxt-link v-for="(interview, index) in data" :to="'/careers/interview/' + interview.post_name" :key="index" class="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-6">
      <article class="row">
        <img :src="interview.featuredimage.src" :srcset="interview.featuredimage.srcset" class="col-4 offset-sm-1 offset-md-0 col-md-4" />
        <div class="content col-8 col-sm-7 col-md-8">
          <h3 v-html="getDetails(interview.post_title).name"></h3>
          <h4 v-html="getDetails(interview.post_title).title"></h4>
        </div>
      </article>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    getDetails (title) {
      let split = title.split(' - ')
      return {
        name: split[0],
        title: split[1]
      }
    }
  }
}
</script>
