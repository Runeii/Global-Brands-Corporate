<template>
  <img :src="src" :srcset="srcset" :title="title" alt="" :width="width" :height="height" />
</template>
<script>
if (process.server === false) {
  var Modernizr = require('~/static/js/modernizr.js')
  var picturefill = require('~/static/js/picturefill.js')
}
export default {
  props: ['src', 'srcset', 'title', 'width', 'height'],
  beforeMount () {
    if (process.server === false && !Modernizr.srcset && typeof picturefill === 'function') {
      picturefill()
    }
  }
}
</script>
