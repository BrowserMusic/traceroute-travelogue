<template>
  <button class="proceed-button" @click="proceed()">
    <span>{{ buttonText() }}</span>
  </button>
</template>

<script>
export default {
  props: {
    locked: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "✉",
    },
    goto: {
      type: String,
      default: null,
    },
  },
  mounted() {
    if (this.locked) {
      this.$store.commit("path/freeze", true);
    }
    console.log(this.goto);
  },
  methods: {
    async proceed() {
      this.$emit("pressed");
      if (this.locked) {
        this.$store.commit("path/freeze", false);
      }
      if (this.goto != null) {
        await this.$store.dispatch("path/toOption", this.goto);
      } else {
        await this.$store.dispatch("path/next");
      }
    },
    buttonText() {
      if (this.text == null) {
        return "Proceed";
      }

      return this.text;
    },
  },
};
</script>

<style lang="scss">
button {
  font-size: 3.3em;
  border: 0px solid transparent;
  border-radius: 13px;
  color: #415fff;
  background-color: #ffc68a;
  box-shadow: inset -2px -2px 2px gray, inset 2px 2px 3px #ffe8cb;
  min-width: 1.1em;

  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 120px;
  max-height: 0.9em;
}
button:active {
  box-shadow: inset 2px 2px 2px gray, inset -2px -2px 3px #ffe8cb;
}
button:disabled {
  background-color: grey;
  box-shadow: none;
  color: white;
}
</style>