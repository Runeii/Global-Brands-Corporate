<template>
  <div class="home">
    <h1>{{error.statusCode}} - {{error.message}}</h1>
  </div>
</template>

<script>
export default {
  name: 'nuxt-error',
  props: ['error'],
  layout: 'default' // you can set a custom layout for the error page
}
</script>
