<template>
  <div
    :class="{
      'big-hello': true,
    }"
  >
    <h1>
      {{ helloText }}
      <button v-if="showButton" @click="$emit('after-typing')">Enter</button>
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    state: String,
    settings: Object,
  },
  data() {
    return {
      helloText: "",
      showButton: false,
    };
  },
  computed: {
    active() {
      return this.$store.state.showBigHello;
    },
  },
  watch: {
    state(newV) {
      if (newV == false) return;
      // if (newV == "showOpeningT") {
      this.animate(this.settings.line, this.settings.speed);
      // }
    },
  },
  mounted() {
    this.$store.commit("path/freeze", true);
    this.animate(this.settings.line, this.settings.speed);
  },
  methods: {
    animate(word, speed = 300) {
      // let word = ["h", "e", "l", "l", "o"];
      word = word.split("");
      let index = 0;

      let ref = this;
      const timeout = setInterval(() => {
        if (index == word.length) {
          this.showButton = true;
        } else if (index > word.length) {
          clearInterval(timeout);
        } else {
          ref.helloText += word[index];
          index++;
        }
      }, speed);
    },
    proceed() {
      // this.$store.commit("path/freeze", false);
      // this.$store.commit("openHello", false);
      this.$emit("after-opening");
    },
  },
};
</script>

<style lang="scss">
.big-hello {
  // display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  // display: table;
  // opacity: 0;
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