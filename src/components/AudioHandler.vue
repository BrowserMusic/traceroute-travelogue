<template>
  <div class="audio-handler">
    <audio-enabler v-if="!audioEnabled" />
  </div>
</template>

<script>
import * as Tone from "tone";
import AudioManager from "../utils/audio/AudioManager.js";
import AudioEnabler from "./misc/AudioEnabler.vue";
const speechFile = "/audio/speech.mp3";

Tone.ToneAudioBuffer.fromUrl(speechFile).then((buff) => {
  mng.setBuffer(buff);
});

const mng = new AudioManager();

export default {
  components: { AudioEnabler },
  data() {
    return {
      audioStarted: false,
    };
  },
  computed: {
    audioEnabled() {
      return this.$store.state.audioEnabled;
    },
    scene() {
      return this.$store.getters["path/getScene"];
    },
    sceneIndex() {
      return this.$store.state.path.sceneIndex;
    },
    lineIndex() {
      return this.$store.state.path.lineIndex;
    },
    line() {
      if ("lines" in this.scene) {
        return this.scene.lines[this.lineIndex];
      }
      return null;
    },
  },
  watch: {
    lineIndex() {
      if (this.$store.state.path.isFastForward) return;
      if (this.line != null && this.lineIndex != 0) {
        this.playLine();
      }
    },
    sceneIndex() {
      if (this.$store.state.path.isFastForward) return;
      if ("lines" in this.scene && this.lineIndex == 0) {
        this.playLine();
      }
      if ("audio" in this.scene) {
        if (!this.scene.audio) {
          mng.stopBackground();
        } else {
          mng.playBackground(this.scene.audio);
        }
      }
    },
  },
  beforeDestroy() {
    mng.beforeDestroy();
    // for (let s of Object.keys(mng)) {
    //   mng[s].synth.dispose();
    // }
  },
  methods: {
    seeMood(text) {
      if (text == null) {
        return "normal";
      } else if (text.includes("?")) {
        return "question";
      } else if (text.includes("!")) {
        return "exclamation";
      } else if (text.includes("...")) {
        return "puzzled";
      } else {
        return "normal";
      }
    },
    resume() {
      Tone.context.resume();
      this.audioStarted = true;
      Tone.Transport.start();
    },
    playLine() {
      const mood =
        "text" in this.line ? this.seeMood(this.line.text) : "normal";
      const length =
        "text" in this.line
          ? Math.max(Math.floor(this.line.text.length / 12), 1)
          : 1;
      mng.play(this.line.speaker.toLowerCase(), {
        length: length,
        mood: mood,
      });
    },
  },
};
</script>

<style lang="scss">
</style>