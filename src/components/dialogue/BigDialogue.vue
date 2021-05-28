<template>
  <div
    class="big-dialogue"
    v-if="scene != null && 'id' in scene && scene.id == 'large'"
  >
    <div class="strip">
      <character-display
        v-for="(c, index) in scene.characters"
        :key="index"
        :name="c.name"
        :align="c.align"
        :style="c.style"
        :isActive="mostRecentActive(c.name)"
      />
    </div>
    <shared-dialogue-line :settings="mostRecentSettings()" />
    <!-- <button @click="proceed()">Proceed</button> -->
  </div>
</template>

<script>
import CharacterDisplay from "./CharacterDisplay.vue";
import SharedDialogueLine from "./SharedDialogueLine.vue";
export default {
  components: { CharacterDisplay, SharedDialogueLine },
  props: {
    scene: Object,
  },
  data() {
    return {
      buttonDisabled: false,
    };
  },
  computed: {
    lineIndex() {
      return this.$store.state.path.lineIndex;
    },
  },
  mounted() {
    // console.log("making big conversation!!");
    // console.log(this.scene);
  },
  methods: {
    mostRecentSettings(c) {
      if (c == null) {
        return this.scene.lines[this.lineIndex];
      }
      const recent = this.scene.lines.filter((line, index) => {
        if (index <= this.lineIndex && line.speaker == c) {
          return line;
        }
      });

      if (recent.length > 0) {
        this.buttonDisabled = "button" in recent[recent.length - 1];
        return recent[recent.length - 1];
      }

      return null;
    },
    mostRecentActive(slug) {
      if ("lines" in this.scene) {
        return this.scene.lines[this.lineIndex].speaker == slug;
      }
      return false;
    },
  },
};
</script>

<style lang="scss">
.big-dialogue {
  position: absolute;
  top: 150px;
  width: 100%;
  z-index: 1000;

  .strip {
    align-items: baseline;
    display: flex;
    justify-content: space-around;

    .single-char {
      position: relative;
      top: 0;

      &.left {
        text-align: right;
      }
      &.right {
        order: 1;
      }
    }
  }
}
</style>