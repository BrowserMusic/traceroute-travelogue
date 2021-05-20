<template>
  <div
    :class="{
      'big-hello': true,
      active: active,
    }"
  >
    <h1>
      {{ helloText }}
      <button v-if="helloText.length == 5" @click="proceed">Enter</button>
    </h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      helloText: "",
    };
  },
  computed: {
    active() {
      return this.$store.state.showBigHello;
    },
  },
  watch: {
    active(newV) {
      if (newV == true) {
        this.animate();
      }
    },
  },
  methods: {
    animate() {
      let word = ["h", "e", "l", "l", "o"];
      let index = 0;

      let ref = this;
      const timeout = setInterval(() => {
        if (index >= word.length) {
          clearInterval(timeout);
          // setTimeout(() => {

          // }, 1000);
        } else {
          ref.helloText += word[index];
          index++;
        }
      }, 100);
    },
    proceed() {
      this.$store.commit("openHello", false);
      this.$emit("after-opening");
    },
  },
};
</script>

<style lang="scss">
.big-hello {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  // display: table;
  opacity: 0;
  z-index: 999;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 10em;
    text-align: center;
  }

  &.active {
    // display: flex;
    display: block;
    opacity: 1;
  }

  button {
    font-size: 0.3em;
  }
}
</style>