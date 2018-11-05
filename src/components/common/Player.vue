<template>
  <div ref="c" style="width: 100%; height: 100%; position: relative;">
    <div class="mask" v-show="loading">
      <img src="@/assets/loading.svg" alt="">
    </div>
    <video
      v-show="!loading"
      ref="v"
      autoplay="true"
      :src="src"
      style="width: 100%; height: 100%;"
    />
  </div>
</template>

<script>
import Plyr from 'plyr';

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    const w = this.$refs.c.clientWidth;
    const h = w * 0.5625;
    this.$refs.c.style.height = `${h}px`;
    this.$refs.v.addEventListener('loadeddata', () => {
      this.loading = false;
    });
  },
  beforeCreate() {
    this.buffer = [];
    this.loops = setInterval(() => {
      while (this.buffer.length) {
        const item = this.buffer.shift();
        if (typeof item === 'function') {
          item.call(this);
        }
      }
    }, 16);
  },
  beforeDestroy() {
    clearInterval(this.loops);
  },
  watch: {
    src: {
      immediate: true,
      handler: function handler() {
        if (!this.$refs.v) {
          this.buffer.push(handler);
          return;
        }
        this.loading = true;
        /* eslint-disable-next-line */
        new Plyr(this.$refs.v, {
          controls: [
            'play-large',
            'play',
            'progress',
            'current-time',
            'mute',
            'volume',
            'settings',
            'fullscreen',
          ],
          autoplay: true,
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #000;
    z-index: 1;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 60px;
      height: 60px;
      transform: translate(-50%, -50%);
    }
  }
</style>
