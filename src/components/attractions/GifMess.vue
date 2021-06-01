<template>
  <div class="gif-mess">
    <div class="gif-mess-inner">
      <img
        v-for="(img, index) in settings.images"
        :src="img"
        :key="index"
        :style="randomStyle()"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    settings: Object,
  },
  methods: {
    randomStyle() {
      let retval = "";
      const width = Math.random() * 150 + 50;
      let top = Math.random() * 20 + 10;
      top *= Math.random() > 0.5 ? -1 : 1;
      retval = `--mess-img-width: ${width}px; --mess-img-top: ${top}px`;

      return retval;
    },
  },
};
</script>

<style lang="scss">
.gif-mess {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;

  .gif-mess-inner {
    width: 50%;
    height: 50%;
    right: 5%;
    position: absolute;
    display: flex;
    align-content: space-evenly;
    flex-wrap: wrap;
    top: 11%;

    img {
      // grid-column-end: span 2;
      flex: 0 1 auto;
      height: max-content;
      margin: 1em;
      margin-top: var(--mess-img-top);
      max-width: 100%;
      width: var(--mess-img-width);

      // &:nth-child(2n) {
      //   margin-top: 0.5em;
      // }

      // &:nth-child(3n) {
      //   margin-top: 0.75em;
      // }

      // &:nth-child(4n) {
      //   margin-top: -0.5em;
      // }
    }
  }
}
</style>