<template>
  <div id="app">
    <LeafletMap @after-opening="beginStory()" />
    <ChapterNode :index="myCity" v-if="isModalOpen" />
  </div>
</template>

<script>
import LeafletMap from "./LeafletMap.vue";
import ChapterNode from "./ChapterNode.vue";

export default {
  name: "App",
  components: {
    LeafletMap,
    ChapterNode,
  },
  data() {
    return {
      myCity: 0,
    };
  },
  computed: {
    isModalOpen() {
      return this.$store.state.isModalOpen;
    },
    city() {
      return this.$store.state.path.currentCity;
    },

    scene() {
      return this.$store.state.path.sceneIndex;
    },
    line() {
      return this.$store.state.path.lineIndex;
    },
  },
  async mounted() {
    const limit = { city: 3, scene: 0 };
    // await this.fastForward(limit);
    window.addEventListener("keyup", this.proceed);
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.proceed);
  },
  methods: {
    passCityVal(e) {
      this.myCity = e;
    },
    beginStory() {
      this.$store.commit("changeLayout");
      this.$store.commit("openModal", true);
      this.$store.commit("path/changeCity", 0);
      this.$store.commit("path/changeScene");
    },
    proceed(e) {
      if (e.code == "Space") {
        this.$store.dispatch("path/next");
      }
    },
    async fastForward(limit) {
      this.$store.commit("path/changeFastState", true);
      let stateval = await this.$store.dispatch("path/fastForwardStep", limit);
      while (stateval != false) {
        this.$nextTick();
        stateval = await this.$store.dispatch("path/fastForwardStep", limit);
      }

      this.$store.commit("path/changeFastState", false);
      this.$store.commit("path/freeze", false);
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}

body {
  margin: 0;
  /* min-height: 100vh; */
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}

.window {
  background-color: white;
  box-shadow: 6px 5px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid grey;
  padding: 1.5em;
}
</style>
