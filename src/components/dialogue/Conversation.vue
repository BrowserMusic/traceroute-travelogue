<template>
  <div :class="generateClass()">
    <div class="lines">
      <DialogueLine
        v-for="(line, index) in lines"
        :key="index"
        :content="line"
        :parent="label"
        :previous="getPrevLine(index)"
        :index="index"
      />
    </div>
    <proceed-button v-if="isFocus && isActiveConvo" />
  </div>
</template>

<script>
import ProceedButton from "../misc/ProceedButton.vue";
import DialogueLine from "./DialogueLine.vue";

export default {
  name: "Conversation",
  components: { DialogueLine, ProceedButton },
  props: {
    scenes: Array,
    label: String,
    isFocus: Boolean,
    isActiveConvo: Boolean,
  },
  computed: {
    sceneIndex() {
      return this.scenes.length - 1;
    },
    currentScene() {
      return this.scenes[this.sceneIndex];
    },
    lineIndex() {
      return this.$store.state.path.lineIndex;
    },
    bigSceneIndex() {
      return this.$store.state.path.sceneIndex;
    },
  },
  data() {
    return {
      lines: [],
    };
  },
  watch: {
    lineIndex(newV) {
      console.log(this.label + " " + newV);
      this.appendToList();
    },
    bigSceneIndex() {
      this.appendToList();
    },
  },
  mounted() {
    this.appendToList();
  },
  methods: {
    getPrevLine(index) {
      if (index > 0) {
        return this.lines[index - 1];
      } else {
        return {};
      }
    },
    generateClass() {
      const focus = this.isActiveConvo ? "focus" : "";
      return `conversation window ${this.label} ${focus}`;
    },
    appendToList() {
      // console.log(this.label + " running appendtolist");
      if (!this.isActiveConvo || this.currentScene.lines[this.lineIndex].seen) {
        // console.log("already seen or inactive");
        return;
      }
      if (this.lineIndex >= this.currentScene.lines.length) {
        // console.log("index too high");
        return;
      } else {
        const line = this.currentScene.lines[this.lineIndex];
        // console.log(
        //   `${this.lineIndex} ${line.speaker}: ${line.text.substring(0, 20)}`
        // );
        this.lines.push(this.currentScene.lines[this.lineIndex]);
        this.currentScene.lines[this.lineIndex].seen = true;
      }
    },
    // toNextStep() {
    //   this.$store.dispatch("path/next");
    // },
  },
};
</script>

<style lang="scss">
.conversation {
  background-color: white;
  // border: 1px solid grey;
  display: flex;
  flex-direction: column;
  height: 80vh;
  max-height: 80vh;
  margin: 1em;
  // padding: 1.5em;
  position: relative;
  width: 40%;

  &.focus {
    z-index: 999;
  }

  .lines {
    height: inherit;
    max-height: inherit;
    overflow-y: scroll;
  }

  button {
    align-self: flex-end;
    display: inline-block;
    margin-top: 1em;
  }
}
</style>