<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-12 col-xl-6">© {{year}} Global Brands Ltd, all rights reserved.</div>
        <ul class="col-12 col-xl-6">
          <li>
            <nuxt-link to='/terms-conditions'>Terms & conditions</nuxt-link>
          </li>
          <li>
            <nuxt-link to='/conditions-of-sale'>Conditions of Sale</nuxt-link>
          </li>
          <li>
            <nuxt-link to='/privacy-policy'>Privacy policy</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
<script>
import format from 'date-fns/format'
export default {
  computed: {
    year () {
      return format(new Date(), 'YYYY')
    }
  }
}
</script>
