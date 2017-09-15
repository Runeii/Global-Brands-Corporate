<template>
  <div class="page contact">
    <main class="container">
      <PageHeader :data="page"></PageHeader>
      <ContactForm></ContactForm>
      <Map></Map>
    </main>
  </div>
</template>

<script>
// This is the catch all template for any WordPress pages that don't have a specific VUE template assigned
import PageHeader from '~/components/PageHeader.vue'
import ContactForm from '~/components/ContactForm.vue'
import Map from '~/components/Map.vue'
import axios from 'axios'

export default {
  head () {
    return {
      title: 'Contact',
      meta: [
        { hid: 'description', name: 'description', content: 'We love to hear from you - whatever your enquiry, we can help.' }
      ]
    }
  },
  components: {
    PageHeader,
    ContactForm,
    Map
  },
  async asyncData (context) {
    return axios.get(context.store.state.ajaxurl + '/custom/contact')
      .then((res) => {
        return {
          page: res.data.page,
          form: res.data.form
        }
      })
      .catch((error) => {
        context.error({ statusCode: error.response.status, message: error.response.data.message })
      })
  }
}
</script>
