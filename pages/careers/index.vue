<template>
  <div class="page careers">
    <main class="container">
      <PageNavigation></PageNavigation>
      <PageHeader :data="page"></PageHeader>
      <CurrentVacancies id="listings" :careers="careers" class="anchor"></CurrentVacancies>
      <StaffInterviews id="interviews" :data="interviews" class="anchor"></StaffInterviews>
    </main>
  </div>
</template>

<script>
import PageNavigation from '~/components/PageNavigation.vue'
import PageHeader from '~/components/PageHeader.vue'
import CurrentVacancies from '~/components/CurrentVacancies.vue'
import StaffInterviews from '~/components/StaffInterviews.vue'
import axios from 'axios'

export default {
  head () {
    return {
      title: 'Careers',
      meta: [
        { hid: 'description', name: 'description', content: 'Global Brands is constantly on the lookout for ambitious and innovative people to help grow and nurture our brands.' }
      ]
    }
  },
  components: {
    PageHeader,
    PageNavigation,
    CurrentVacancies,
    StaffInterviews
  },
  mounted () {
    if (this.$nuxt.$route.hash) {
      let el = this.$nuxt.$el.querySelector(this.$nuxt.$route.hash)
      if (el) {
        el.scrollIntoView({behavior: 'smooth', block: 'center'})
      }
    }
  },
  async asyncData (context) {
    return axios.get(context.store.state.ajaxurl + '/custom/jobs')
      .then((res) => {
        return {
          page: res.data.page,
          careers: res.data.listings,
          interviews: res.data.interviews,
          title: res.data.page.formatted_title
        }
      })
      .catch((error) => {
        context.error({ statusCode: error.response.status, message: error.response.data.message })
      })
  }
}
</script>
