<template>
  <div class="audio-handler">
    <audio-enabler v-if="!audioEnabled" />
  </div>
</template>

<script>
import * as Tone from "tone";
import AudioManager from "../utils/audio/AudioManager.js";
import AudioEnabler from "./misc/AudioEnabler.vue";
import folks from "../data/characters.json";
const audioLoc = "/audio/speech.mp3";
const mng = new AudioManager(folks, audioLoc);

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
      if (this.line != null) {
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
      }
    },
    sceneIndex() {
      if (this.$store.state.path.isFastForward) return;
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
    // playSound(speaker, length, mood) {
    //   if (speaker in mng) {
    //     if (speaker == "box") {
    //       mng.box.synth.triggerAttackRelease(0.3);
    //     } else {
    //       mng[speaker].synth.modulationIndex.value = Math.random() * 20 + 10;
    //       length = Math.max(Math.floor(length / 12), 1);
    //       const events = this.makeEvents(speaker, mood, length);
    //       const seq = new Tone.Sequence(
    //         (time, note) => {
    //           mng[speaker].synth.modulationIndex.value = note.mod;
    //           mng[speaker].synth.triggerAttackRelease(note.pitch, 0.035, time);
    //         },
    //         events.events,
    //         events.speed
    //       );

    //       seq.start();
    //       seq.loop = false;
    //     }
    //   }
    // },
    // makeEvents(speaker, mood = "normal", limit = 5, deviance = 30) {
    //   // question, exclamation, puzzled, normal
    //   let events = [];
    //   let speed = 0.1;
    //   let pitch = mng[speaker].pitch;

    //   if (mood == "puzzled") {
    //     speed = 0.2;
    //   } else if (mood == "exclamation") {
    //     speed = 0.09;
    //     limit += 2;
    //   } else if (mood == "question") {
    //     limit += 1;
    //   }

    //   limit = Math.min(limit, 8);

    //   for (let i = 0; i < limit; i++) {
    //     if (mood == "question") {
    //       pitch += 20;
    //     }
    //     events[i] = {
    //       pitch: pitch + (Math.random() * deviance - deviance / 2),
    //       mod: Math.random() * 20 + 10,
    //     };
    //   }

    //   return { events: events, speed: speed };
    // },
    // makeSynth(stype, pitch) {
    //   return {
    //     synth: new Tone.FMSynth({
    //       volume: -6,
    //       oscillator: {
    //         type: stype,
    //       },
    //       harmonicity: 2,
    //       modulationIndex: 12.22,
    //       modulation: {
    //         type: "square",
    //       },
    //     }).toDestination(),
    //     pitch: pitch,
    //   };
    // },
  },
};
</script>

<style lang="scss">
</style>