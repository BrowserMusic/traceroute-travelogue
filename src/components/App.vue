<template>
  <div id="app">
    <BigHello
      v-if="triggerState != false"
      :state="triggerState"
      :settings="scene.settings"
      @after-typing="beginStory()"
    />
    <LeafletMap
      :animate="mapAnim"
      :animateType="mapAnimType"
      @after-opening="toTyping()"
    />
    <ChapterNode :index="myCity" v-if="isModalOpen" />
  </div>
</template>

<script>
import LeafletMap from "./LeafletMap.vue";
import ChapterNode from "./ChapterNode.vue";
import BigHello from "./misc/BigHello.vue";

export default {
  name: "App",
  components: {
    LeafletMap,
    ChapterNode,
    BigHello,
  },
  data() {
    return {
      myCity: 0,
      triggerState: false,
      mapAnim: false,
      mapAnimType: "",
    };
  },
  computed: {
    isModalOpen() {
      return this.$store.state.isModalOpen;
    },
    city() {
      return this.$store.state.path.currentCity;
    },
    sceneIndex() {
      return this.$store.state.path.sceneIndex;
    },
    scene() {
      return this.$store.getters["path/getScene"];
    },
    line() {
      return this.$store.state.path.lineIndex;
    },
  },
  watch: {
    sceneIndex() {
      this.checkLayout();
      this.getHelloState();
      console.log(this.scene);
    },
  },
  async mounted() {
    this.checkLayout();
    this.getHelloState();
    const limit = { city: 0, scene: 1 };
    await this.fastForward(limit);

    window.addEventListener("keyup", this.proceed);
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.proceed);
  },
  methods: {
    passCityVal(e) {
      this.myCity = e;
    },
    getHelloState() {
      console.log(this.scene);
      if ("scene" in this.scene) {
        this.$store.commit("path/freeze", true);
        if (this.scene.scene == "showOpeningMap") {
          this.mapAnim = true;
          this.mapAnimType = "showOpeningMap";
        } else if (this.scene.scene == "showClosingMap") {
          this.mapAnim = true;
          this.mapAnimType = "showClosingMap";
        } else if (this.scene.scene == "showOpeningTyping") {
          this.triggerState = "showOpeningTyping";
        } else if (this.scene.scene == "showClosingTyping") {
          this.triggerState = "showClosingTyping";
        } else {
          console.error();
          this.triggerState = false;
        }
      } else {
        this.triggerState = false;
      }

      console.log(this.triggerState);
    },
    toTyping() {
      this.$store.commit("path/freeze", false);
      this.$store.commit("path/changeScene");
      console.log("begin typing");
      this.mapAnim = false;
      // await this.$store.dispatch("path/next");
    },
    checkLayout() {
      if ("layout" in this.scene) {
        this.$store.commit("changeLayout", this.scene.layout);
      }
      if (!("layout" in this.scene) || this.scene.layout == "chapter") {
        this.$store.commit("changeLayout", "chapter");
        this.$store.commit("openModal", true);
      }
    },
    beginStory() {
      if (this.triggerState == "showOpeningTyping") {
        this.$store.commit("path/freeze", false);
        // this.$store.commit("changeLayout");
        this.$store.commit("openModal", true);
        this.$store.commit("path/changeScene");
      } else {
        this.$store.commit("openModal", false);
      }
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
