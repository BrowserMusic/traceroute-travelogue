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

<style>
</style>