<template>
  <ul id="submenu" class="container submenu" v-if="sections">
    <nuxt-link v-for="(section, index) in sections" :to="section.link" :key="index" :style="'width: ' + width">
      <li>{{section.name}}</li>
    </nuxt-link>
  </ul>
</template>

<script>
export default {
  computed: {
    width () {
      return (100 / this.$props.sections.length) + '%'
    }
  },
  props: ['sections']
}
</script>
