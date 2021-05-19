<template>
  <div class="chapter-wrap">
    <ConversationManager
      :nextScene="sceneIfDialogue"
      @end-scene="sceneChange()"
    />
    <AnimationManager
      v-if="scene.type == 'animation'"
      :scene="scene"
      @end-scene="sceneChange()"
      @next-step="toNextStep()"
    />

    <!-- <button @click.prevent="toNextStep()">Proceed</button> -->
    <button @click.prevent="toNextNode()">Done</button>
  </div>
</template>

<script>
import ConversationManager from "./dialogue/ConversationManager.vue";
import AnimationManager from "./AnimationManager.vue";

export default {
  name: "ChapterNode",
  components: { ConversationManager, AnimationManager },
  data() {
    return {
      lines: [],
      sceneIndex: 0,
      lineIndex: 0,
    };
  },
  computed: {
    chapter() {
      const retval = this.$store.getters["path/getCurrentChapter"];
      return retval;
    },
    scene() {
      return this.$store.getters["path/getScene"];
    },
    city() {
      return this.$store.getters["path/getCurrentCityInfo"];
    },
    sceneIfDialogue() {
      if ("lines" in this.scene) {
        console.log(this.scene);
        return this.scene;
      } else {
        return null;
      }
    },
  },
  mounted() {
    // this.toNextStep();
  },
  methods: {
    sceneChange() {
      console.log("requesting a scene change");
      this.$store.commit("path/changeScene");
    },
    toNextStep() {
      this.lineIndex++;

      if (this.lineIndex >= this.scene.lines.length) {
        this.$store.commit("path/changeScene");
        this.lineIndex = 0;
      }
    },
    toNextNode() {
      this.$store.commit(
        "path/changeCity",
        this.$store.state.path.currentCity + 1
      );

      this.$store.commit("changeLayout");
    },
  },
};
</script>

<style lang="scss">
.chapter-wrap {
  min-height: 500px;
  width: 100%;
}
</style>