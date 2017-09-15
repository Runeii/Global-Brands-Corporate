<template>
  <img :src="src" :srcset="sourceSet" :title="title" alt="" :width="width" :height="height" :id="'picture_' + id" />
</template>
<script>
if (process.server === false) {
  var Modernizr = require('~/static/js/modernizr.js')
  var picturefill = require('~/static/js/picturefill.js')
}
export default {
  props: ['src', 'srcset', 'title', 'width', 'height', 'id'],
  computed: {
    sourceSet () {
      if (this.$props.srcset !== null && typeof this.$props.srcset === 'object') {
        let srcset = ''
        if (typeof Object.keys(this.$props.srcset) !== 'undefined' && Object.keys(this.$props.srcset).length > 0) {
          Object.keys(this.$props.srcset).forEach((size) => {
            if (size > 200 && size < (this.$props.width * 1.5)) {
              srcset += this.$props.srcset[size] + ', '
            }
          })
        }
        if (srcset === '') {
          return this.$props.srcset
        } else {
          return srcset
        }
      } else {
        return this.$props.srcset
      }
    }
  },
  beforeMount () {
    if (process.server === false && !Modernizr.srcset && typeof picturefill === 'function') {
      picturefill('picture_' + this.$props.id)
    }
  }
}
</script>
