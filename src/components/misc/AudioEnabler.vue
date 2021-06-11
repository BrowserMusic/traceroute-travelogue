<template>
  <div class="audio-enabler">
    <button class="resume-audio" @click="resume()">Audio</button>
  </div>
</template>

<script>
import * as Tone from "tone";
export default {
  methods: {
    resume() {
      Tone.context.resume();
      this.audioStarted = true;
      Tone.Transport.start();

      this.$emit("audio-enabled");
      this.$store.commit("openAudio", true);
    },
  },
};
</script>

<style>
</style>