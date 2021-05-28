<template>
  <div
    :class="'single-char char-' + name + ' ' + align + ' ' + isCurrentSpeaker()"
    v-if="'display' in self"
    :style="charStyle"
  >
    <div class="char-icon-wrap">
      <video
        v-if="self.display.type == 'video'"
        autoplay
        loop
        muted
        playsinline
      >
        <source :src="self.display.file" type="video/mp4" />
      </video>
      <img v-else-if="self.display.type == 'image'" :src="self.display.file" />
    </div>
    <shared-dialogue-line :settings="settings" />
  </div>
</template>

<script>
import chars from "../../data/characters.json";
import SharedDialogueLine from "./SharedDialogueLine.vue";

export default {
  components: { SharedDialogueLine },
  props: {
    name: String,
    align: String,
    settings: Object,
    charStyle: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      self: {},
      interval: {},
      text: null,
    };
  },
  watch: {
    settings(newV) {
      if ("button" in newV) {
        this.$store.commit("path/freeze", true);
      }

      this.decideText();
    },
  },
  mounted() {
    this.self = chars[this.name.toLowerCase()];
    this.decideText();
  },
  methods: {
    proceed() {
      this.$store.commit("path/freeze", false);
      clearInterval(this.interval);
      this.$store.dispatch("path/next");
    },
    decideText() {
      if (this.settings == null) return;
      if ("text" in this.settings) {
        this.text = this.settings.text;
      } else if ("genText" in this.settings) {
        this.text = this.randomText();

        this.interval = setInterval(() => {
          this.text = this.randomText();
        }, 300);
      } else if ("button" in this.settings) {
        this.text = "";
      }
    },
    randomText() {
      let str = "";
      for (let i = 0; i < 20; i++) {
        str += String.fromCharCode(Math.floor(Math.random() * 65535));
      }

      return str;
    },
    isCurrentSpeaker() {
      return this.isActive ? "active" : "";
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/charstyles.scss";

.single-char {
  --char-width: 350px;
  --char-font-size: 2em;
  --char-margin-top: 0em;
  font-size: var(--char-font-size);
  margin-top: var(--char-margin-top);
  max-width: var(--char-width);
  position: absolute;
  bottom: 200px;
  z-index: 1000;

  &.left {
    left: 0;
    margin-left: 1em;

    .text-bubble {
      margin-left: 1.5em;
      margin-right: -1.5em;
    }
  }
  &.right {
    right: 0;
    margin-right: 1em;
  }

  .char-icon-wrap {
    max-width: inherit;
    position: relative;
    width: inherit;

    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 75px;
    padding: 0.5em;
    border: 1px solid grey;
  }

  video,
  img {
    border-radius: 75px;
    // max-width: inherit;
    width: 100%;
  }

  img {
    width: calc(var(--char-width) - 100px);
    height: auto;
  }
}

.single-char.active .char-icon-wrap {
  background-color: yellow;
}
</style>