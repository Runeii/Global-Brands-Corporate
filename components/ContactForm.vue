<template>
  <div class="contactform row" :class="{success: result}">
    <h3 class="col-10 offset-1 col-lg-10">Get in touch</h3>
    <div class="personal col-12 offset-lg-1 col-lg-4">
      <input v-model="form.name" placeholder="Name" class="col-10 offset-1 col-lg-12 offset-lg-0" />
      <input v-model="form.phone" placeholder="Phone" class="col-10 offset-1 col-lg-12 offset-lg-0" />
      <input v-model="form.email" placeholder="Email" class="col-10 offset-1 col-lg-12 offset-lg-0" />
      <input v-model="form.job" placeholder="Job Title" class="col-10 offset-1 col-lg-12 offset-lg-0" />
      <input v-model="form.company" placeholder="Company" class="col-10 offset-1 col-lg-12 offset-lg-0" />
      <input v-model="form.route" placeholder="Route to Market" class="col-10 offset-1 col-lg-12 offset-lg-0" />
      <input v-model="form.subject" placeholder="Subject" class="col-10 offset-1 col-lg-12 offset-lg-0" />
      <select v-model="form.category" placeholder="Category" class="col-10 offset-1 col-lg-12 offset-lg-0">
        <option value="support">Customer Support</option>
        <option value="press">Press, PR, Advertising</option>
        <option value="export">Export and Int. Distribution</option>
        <option value="stockists">Stock Our Products</option>
        <option value="general">General Information</option>
        <option value="careers">Careers</option>
      </select>
    </div>
    <div class="sending col-12 col-lg-5 offset-lg-1">
      <textarea v-model="form.message" placeholder="Message" class="col-10 offset-1 col-lg-12 offset-lg-0" rows="10"></textarea>
      <div class="col-10 offset-1 col-lg-12 offset-lg-0 checkrow">
        <input type="checkbox" id="checkbox" v-model="form.checked">
        <label for="checkbox">Send a copy to my email</label>
      </div>
      <div class="col-10 offset-1 col-lg-12 offset-lg-0">
        <button v-if="valid" v-on:click="submitForm">Submit</button>
        <button v-else disabled>Submit</button>
      </div>
    </div>
    <div class="status col-10 offset-1 col-lg-12 offset-lg-0" :class="{complete: answer}">{{answer}}</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  computed: {
    valid () {
      if (this.form.name && this.form.phone && this.validateEmail(this.form.email) && this.form.category && this.form.subject && this.form.message) {
        return true
      } else {
        return false
      }
    },
    answer () {
      if (this.result === true) {
        return 'Message sent successfully. One of our team will respond shortly.'
      } else if (this.result === false) {
        return 'Error sending message. Please try again later or use an alternative contact method.'
      } else {
        return false
      }
    }
  },
  data () {
    return {
      form: {
        name: '',
        category: '',
        phone: '',
        email: '',
        job: '',
        company: '',
        route: '',
        subject: '',
        message: '',
        checked: false
      },
      result: null
    }
  },
  methods: {
    submitForm () {
      let data = this.form
      axios.post(this.$store.state.ajaxurl + '/custom/form', { data })
        .then((res) => {
          this.result = res.data
        })
    },
    validateEmail (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
  }
}
</script>
