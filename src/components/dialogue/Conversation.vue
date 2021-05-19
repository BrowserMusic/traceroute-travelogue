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
    <button @click="toNextStep()">Proceed</button>
  </div>
</template>

<script>
import DialogueLine from "./DialogueLine.vue";

export default {
  name: "Conversation",
  components: { DialogueLine },
  props: {
    scenes: Array,
    label: String,
  },
  computed: {
    sceneIndex() {
      return this.scenes.length - 1;
    },
    currentScene() {
      return this.scenes[this.sceneIndex];
    },
  },
  data() {
    return {
      lines: [],
      lineIndex: 0,
    };
  },
  watch: {
    sceneIndex(newV) {
      // console.log("sceneIndex watch");
      // console.log(this.scenes);
      if (newV > 0) {
        this.lineIndex = 0;
        // this.lines.push(this.currentScene.lines[this.lineIndex]);
        // console.log(this.lines);
      }
    },
  },
  mounted() {
    console.log(this.scene);
    this.toNextStep();
  },
  methods: {
    getPrevLine(index) {
      if (index > 0) {
        return this.lines[index - 1];
        // } else if (index == 0 && this.sceneIndex > 0) {
        //   const lastScene = this.scenes[this.sceneIndex - 1].lines;
        //   console.log("last scene");
        //   console.log(lastScene[lastScene.length - 1]);
        //   return lastScene[lastScene.length - 1];
      } else {
        return {};
      }
    },
    generateClass() {
      return `conversation ${this.label}`;
    },
    toNextStep() {
      console.log(this.currentScene);
      console.log(this.lineIndex, this.currentScene.lines.length);
      // console.log(this.sceneIndex);
      if (this.lineIndex >= this.currentScene.lines.length) {
        this.$emit("end-scene");
        // this.lineIndex = 0;
        // this.lines = [];
        return;
      } else {
        // this.$emit("next-step");
        // if (this.lineIndex == 0) {
        //   this.lines = [this.currentScene.lines[this.lineIndex]];
        // } else {
        this.lines.push(this.currentScene.lines[this.lineIndex]);
        // console.log(this.lines);
        // }
      }

      this.lineIndex++;

      // this.lineIndex++;
    },
  },
};
</script>

<style lang="scss">
.conversation {
  background-color: white;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  height: 80vh;
  max-height: 80vh;
  margin: 1em;
  padding: 1.5em;
  position: relative;
  width: 50%;

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