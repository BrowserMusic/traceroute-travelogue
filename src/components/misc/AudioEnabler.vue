<template>
  <div class="audio-enabler">
    <button v-if="!audioStarted" class="resume-audio" @click="resume()">
      Audio
    </button>
  </div>
</template>

<script>
import * as Tone from "tone";
export default {
  data() {
    return {
      audioStarted: false,
    };
  },
  methods: {
    resume() {
      Tone.context.resume();
      this.audioStarted = true;
      Tone.Transport.start();

      this.$emit("audio-enabled");
    },
  },
};
</script>

<style>
</style>