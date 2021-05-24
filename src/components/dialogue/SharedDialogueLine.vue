<template>
  <div
    :class="'text-bubble char-' + settings.speaker"
    v-if="text != null || (settings != null && 'button' in settings)"
  >
    <p v-if="'speaker' in settings" class="bubble-speaker">
      {{ settings.speaker }}
    </p>
    <p v-if="text != null" class="bubble-text">
      {{ text }}
    </p>
    <proceed-button
      :locked="hasButton() && 'freeze' in settings"
      :text="hasButton() ? settings.button : null"
      @pressed="proceed()"
    />
    <!-- <button v-if="settings != null && 'button' in settings" @click="proceed()">
      {{ settings.button }}
    </button> -->
  </div>
</template>

<script>
import ProceedButton from "../misc/ProceedButton.vue";

export default {
  components: { ProceedButton },
  props: {
    settings: Object,
  },
  data() {
    return {
      interval: {},
      text: null,
    };
  },
  mounted() {
    this.decideText();
  },
  watch: {
    settings() {
      this.decideText();
    },
  },
  methods: {
    proceed() {
      // this.$store.commit("path/freeze", false);
      clearInterval(this.interval);
      // this.$store.dispatch("path/next");
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
    hasButton() {
      return this.settings != null && "button" in this.settings;
    },
  },
};
</script>

<style lang="scss">
.text-bubble {
  background-color: white;
  border: 1px solid grey;
  padding: 0.9em;
  margin: 0 auto;
  // margin-top: -1em;
  width: 70%;

  p {
    margin: 0;
  }

  .bubble-speaker {
    border: 1px solid black;
    font-size: 1em;
    font-family: "Helvetica", sans-serif;
    margin-top: -1.5em;
    padding: 0.25em 0.5em;
    width: 100px;
    margin-bottom: 1em;
    background-color: white;
  }
}
</style>