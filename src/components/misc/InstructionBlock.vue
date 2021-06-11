<template>
  <div class="instructions-wrap">
    <div class="instructions-inner window">
      <h2>{{ settings.title }}</h2>
      <p v-for="(para, index) in settings.paragraphs" :key="index">
        {{ para }}
      </p>
      <audio-enabler v-if="'audioEnabler' in settings && !audioEnabled" />
      <proceed-button v-if="audioEnabled" :locked="true" />
    </div>
  </div>
</template>

<script>
import AudioEnabler from "./AudioEnabler.vue";
import ProceedButton from "./ProceedButton.vue";

export default {
  components: { AudioEnabler, ProceedButton },
  props: {
    settings: Object,
  },
  mounted() {
    this.$store.commit("path/freeze", true);
  },
  // data() {
  //   return {
  //     audioEnabled: false,
  //   };
  // },
  computed: {
    audioEnabled() {
      return this.$store.state.audioEnabled;
    },
  },
  // methods: {
  //   dummy() {
  //     console.log("hello dummy??");
  //     this.audioEnabled = true;
  //   },
  // },
};
</script>

<style lang="scss">
.instructions-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  .instructions-inner {
    width: 50%;
    height: 50%;
    box-shadow: 7px 7px 0 0 rgba(0, 0, 0, 0.25);
    display: flex;
    // align-items: center;
    justify-content: center;
    flex-direction: column;

    p {
      margin-top: 0;
    }
  }
}
</style>