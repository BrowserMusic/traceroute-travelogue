<template>
  <div class="audio-handler">
    <button v-if="!audioStarted" class="resume-audio" @click="resume()">
      Audio
    </button>
  </div>
</template>

<script>
import * as Tone from "tone";
const mng = {};

export default {
  data() {
    return {
      audioStarted: false,
    };
  },
  computed: {
    scene() {
      return this.$store.getters["path/getScene"];
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
      this.playSound(this.line.speaker.toLowerCase());
    },
  },
  mounted() {
    mng.becky = this.makeSynth("sine", "C4");
    mng.zak = this.makeSynth("triangle", "E3");
    mng.box = this.makeSynth("sine", "A5");
  },
  beforeDestroy() {
    for (let s of Object.keys(mng)) {
      mng[s].synth.dispose();
    }
  },
  methods: {
    resume() {
      Tone.context.resume();
      this.audioStarted = true;
    },
    playSound(speaker) {
      if (speaker in mng) {
        // console.log(mng[speaker].synth);
        mng[speaker].synth.modulationIndex.value = Math.random() * 20 + 10;
        mng[speaker].synth.harmonicity.value = Math.random() * 0.25 + 2;
        mng[speaker].synth.triggerAttackRelease(mng[speaker].pitch, "8n");
      }
    },
    makeSynth(stype, pitch) {
      return {
        synth: new Tone.FMSynth({
          volume: 0.5,
          oscillator: {
            type: stype,
          },
          harmonicity: 2.1,
          modulationIndex: 12.22,
          modulation: {
            type: "square",
          },
        }).toDestination(),
        pitch: pitch,
      };
    },
  },
};
</script>

<style lang="scss">
</style>