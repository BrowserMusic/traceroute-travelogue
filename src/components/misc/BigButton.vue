<template>
  <button class="big-button" @click="proceed()">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: String,
  },
  mounted() {
    this.$store.commit("path/freeze", true);
  },
  methods: {
    proceed() {
      this.$store.commit("path/freeze", false);
      this.$store.dispatch("path/next");
    },
  },
};
</script>

<style>
.big-button {
  box-shadow: inset -4px -4px 2px rgba(0, 0, 0, 0.25), inset 4px 4px 3px #ffe8cb;
  font-size: 5em;
  position: absolute;
  top: 25%;
  left: 25%;
  width: 60%;
  z-index: 1000;
  max-height: initial;
}
</style>