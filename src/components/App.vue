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
    // BigHello,
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
  },
  mounted() {
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
  },
};
</script>

<style>
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
