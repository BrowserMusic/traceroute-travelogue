<template>
  <button :class="generateClass()" @click="proceed()">
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
        return "✉";
      }

      return this.text;
    },
    generateClass() {
      let retval = this.text == "✉" || this.text == null ? "envelope" : "";
      retval += " proceed-button";
      return retval;
    },
  },
};
</script>

<style lang="scss">
button {
  border: 0px solid transparent;
  border-radius: 13px;
  color: #415fff;
  background-color: #ffc68a;
  box-shadow: inset -2px -2px 2px gray, inset 2px 2px 3px #ffe8cb;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.2em;
  font-weight: bold;
  padding: 0.4em;

  &.envelope {
    font-size: 3.3em;
    max-height: 0.9em;
    min-width: 1.1em;
    padding: 0;
  }
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