<template>
  <div class="big-hello">
    <div class="chat-block">
      <div class="written-zone">
        <p class="left"></p>
        <p class="left"></p>
        <p class="right"></p>
        <p class="left">
          <span v-if="'oldline' in settings">{{ settings.oldline }}</span>
        </p>
      </div>
      <div class="write-line">
        <p>
          <span>{{ helloText }}</span>
        </p>
        <button :disabled="!showButton" @click="$emit('after-typing')">
          ✉
        </button>
      </div>
    </div>
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
      helloText: " ",
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
      setTimeout(() => {
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
      }, 700);
    },
    proceed() {
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
  display: flex;
  // opacity: 0;
  z-index: 999;
  justify-content: center;
  align-items: flex-start;

  .chat-block {
    border: 1px solid grey;
    border-radius: 2px;
    box-shadow: 9px 9px 0 0 rgba(0, 0, 0, 0.25);
    width: 50%;
    min-height: 480px;
    background-color: white;

    display: flex;
    justify-content: flex-end;
    flex-direction: column;

    padding: 2em;
    position: relative;
    top: -200px;
  }

  .write-line {
    width: 100%;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 5fr 1fr;
    max-height: 100px;
    // margin: 2em;

    p {
      border: 1px solid gray;
      box-shadow: 3px 3px 3px inset rgba(0, 0, 0, 0.25);
      padding: 0.6em;
      margin: 0;
      border-radius: 13px;
      font-size: 2em;
      min-height: 72px;
    }

    span {
      display: inline-block;
      position: relative;
      min-height: 28px;
    }

    span::after {
      content: "";
      position: absolute;
      top: -1px;
      right: -3px;
      width: 2px;
      height: 100%;
      background-color: black;
    }
  }

  .written-zone {
    p {
      border-radius: 10px;
      width: 80%;
      background-color: #abcae3;
      min-height: 50px;
      padding: 1em;
      font-size: 1.2em;
    }
    p.right {
      background-color: #afe3ab;
      margin-right: 0;
      margin-left: auto;
    }
  }

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
    font-size: 3.3em;
    border: 0px solid transparent;
    border-radius: 13px;
    color: #415fff;
    background-color: #ffc68a;
    box-shadow: inset -2px -2px 2px gray, inset 2px 2px 3px #ffe8cb;

    min-width: initial;
    max-height: initial;
  }
  button:active {
    box-shadow: inset 2px 2px 2px gray, inset -2px -2px 3px #ffe8cb;
  }
  button:disabled {
    background-color: grey;
    box-shadow: none;
    color: white;
  }
}
</style>