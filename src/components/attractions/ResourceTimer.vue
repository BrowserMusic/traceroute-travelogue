<template>
  <div class="resource-timer"></div>
</template>

<script>
export default {
  computed: {
    sceneIndex() {
      return this.$store.state.path.sceneIndex;
    },
  },
  watch: {
    sceneIndex() {
      // console.log("timer");
      // this.getResources();
    },
  },
  mounted() {
    this.getResources();
  },
  methods: {
    getResources() {
      if (
        !("performance" in window) ||
        !("getEntriesByType" in window.performance) ||
        !(window.performance.getEntriesByType("resource") instanceof Array)
      ) {
        document.getElementById("rt-unsupported").classList.remove("hidden");
      } else {
        // window.addEventListener("load", function () {
        var resources = window.performance.getEntriesByType("resource");
        console.log(resources);
        // for(var obj in resources) {
        //   console.log
        //  var list = '';
        //  for(var properties in resources[obj]) {
        //     list += '<li>' + properties + ': <span class="value">' + resources[obj][properties] + '</span></li>';
        //  }
        //  document.getElementById(resources[obj].initiatorType + '-list').innerHTML = list;
        // }
        // });
      }
    },
  },
};
</script>

<style>
</style>