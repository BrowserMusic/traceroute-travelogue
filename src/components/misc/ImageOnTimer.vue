<template>
  <div class="solo-img">
    <img :src="settings.src" />
  </div>
</template>

<script>
export default {
  props: {
    settings: Object,
  },
  mounted() {
    this.$store.commit("path/freeze", true);
    setTimeout(() => {
      this.$store.commit("path/freeze", false);
      this.$store.dispatch("path/next");
    }, this.settings.timer);
  },
};
</script>

<style>
</style>