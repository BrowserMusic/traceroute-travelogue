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
    <button v-if="isFocus && isActiveConvo" @click="toNextStep()">
      Proceed
    </button>
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
  },
  data() {
    return {
      lines: [],
    };
  },
  watch: {
    // sceneIndex(newV) {
    //   if (newV > 0) {
    //     this.$store.commit("path/changeLine", 0);
    //     this.toNextStep();
    //   }
    // },
    lineIndex() {
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
      if (!this.isActiveConvo) return;
      if (this.lineIndex >= this.currentScene.lines.length) {
        return;
      } else {
        this.lines.push(this.currentScene.lines[this.lineIndex]);
      }
    },
    toNextStep() {
      this.$store.dispatch("path/next");
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