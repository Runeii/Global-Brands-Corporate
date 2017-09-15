<template>
  <div class="loading-page" v-if="loading">
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    loading () {
      return this.$store.state.loading
    }
  },
  methods: {
    start () {
      this.$store.commit('updateloadingState', true)
    },
    finish () {
      this.$store.commit('updateloadingState', false)
    }
  }
}
</script>

<style>
  .loading-page {
    position: fixed;
    top: 50%;
    left: 50%;
    transform:translateX(-50%) translateY(-50%);
    text-align: center;
    z-index:999;
  }
  .spinner {
    margin: 100px auto;
    width: 100px;
    height: 40px;
    text-align: center;
    font-size: 10px;
  }

  .spinner > div {
    background-color: white;
    height: 100%;
    width: 6px;
    margin:3px;
    display: inline-block;

    animation: sk-stretchdelay 1.2s infinite ease-in-out;
  }

  .spinner .rect2 {
    animation-delay: -1.1s;
  }

  .spinner .rect3 {
    animation-delay: -1.0s;
  }

  .spinner .rect4 {
    animation-delay: -0.9s;
  }

  .spinner .rect5 {
    animation-delay: -0.8s;
  }

  @keyframes sk-stretchdelay {
    0%, 40%, 100% {
      transform: scaleY(0.4);
    }  20% {
      transform: scaleY(1.0);
    }
  }
</style>
