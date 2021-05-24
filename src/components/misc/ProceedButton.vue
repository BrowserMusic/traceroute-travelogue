<template>
  <button class="proceed-button" @click="proceed()">
    {{ buttonText() }}
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
      default: "Proceed",
    },
  },
  mounted() {
    // console.log("in proceed button");
    // console.log(this.locked, this.text);
    if (this.locked) {
      // console.log("freezing");
      this.$store.commit("path/freeze", true);
    }
  },
  methods: {
    proceed() {
      this.$emit("pressed");
      if (this.locked) {
        // console.log("unfreezing");
        this.$store.commit("path/freeze", false);
        // console.log(this.$store.state.freezeState);
      }
      this.$store.dispatch("path/next");
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

<style>
</style>