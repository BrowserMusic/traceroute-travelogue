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
    <button v-if="isFocus" @click="toNextStep()">Proceed</button>
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
    isFocus: Boolean,
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
  },
  data() {
    return {
      lines: [],
      // lineIndex: 0,
    };
  },
  watch: {
    sceneIndex(newV) {
      if (newV > 0) {
        // this.lineIndex = 0;
        this.$store.commit("path/changeLine", 0);
      }
    },
  },
  mounted() {
    // console.log(this.scene);
    this.toNextStep();
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
      return `conversation window ${this.label}`;
    },
    toNextStep() {
      // console.log(this.lineIndex);
      if (this.lineIndex >= this.currentScene.lines.length) {
        this.$emit("end-scene");
        return;
      } else {
        this.lines.push(this.currentScene.lines[this.lineIndex]);
      }

      this.$store.commit("path/changeLine");
    },
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