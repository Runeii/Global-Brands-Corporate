<template>
  <nuxt :class="loading" />
</template>
<script>
export default {
  computed: {
    loading () {
      if (this.$store.state.loading === true) {
        return 'loading'
      } else {
        return ''
      }
    }
  }
}
</script>
