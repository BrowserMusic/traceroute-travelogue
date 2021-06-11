<template>
  <div class="resource-timer window">
    <ul>
      <li class="header">
        <span class="resource-name">Resource</span
        ><span class="resource-size">Size</span>
      </li>
      <li v-for="(thing, index) in resources" :key="index">
        <span class="resource-name">{{ shortenName(thing.name) }}</span>
        <span class="resource-size">{{
          formatBytes(thing.encodedBodySize)
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    sceneIndex() {
      return this.$store.state.path.sceneIndex;
    },
  },
  data() {
    return {
      resources: [],
    };
  },
  watch: {
    sceneIndex() {
      console.log("scene index");
      // console.log("timer");
      this.getResources();
    },
  },
  mounted() {
    console.log("mounted");
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
        resources = resources.filter(
          (s) => s.transferSize != 0 || s.encodedBodySize != 0
        );

        this.resources = resources;
        this.$store.commit("path/comps/componentUpdateSelf", {
          name: "resourcetimer",
          data: this.resources,
        });
      }
    },
    shortenName(name) {
      return name.replace(window.location.origin, "");
    },
    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return "0 Bytes";

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },
  },
};
</script>

<style lang="scss">
.resource-timer {
  position: absolute;
  max-width: 350px;
  right: 200px;
  bottom: 3em;
  max-height: 600px;
  overflow-y: scroll;
  // padding: 1em;

  ul {
    padding-left: 0;
    list-style-type: none;

    li {
      display: grid;
      grid-gap: 10px;
      grid-template-columns: 2fr 1fr;
      padding-bottom: 0.5em;

      .resource-name {
        display: block;
        word-break: break-all;
      }

      .resource-size {
        text-align: right;
      }
    }

    li.header {
      font-weight: bold;
    }
  }
}
</style>