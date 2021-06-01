<template>
  <div class="concert">
    <h4><span>a brief concert</span></h4>
    <p>{{ settings.beforeText }}</p>
    <audio controls @ended="onEnd()">
      <source :src="settings.src" type="audio/mpeg" />
    </audio>
    <p v-if="ended">{{ settings.afterText }}</p>

    <template v-if="ended && 'choices' in settings">
      <proceed-button
        v-for="(opt, index) in settings.choices"
        :key="index"
        :text="opt"
        :goto="settings.to"
      />
    </template>
    <proceed-button v-else-if="ended" text="Return..." :goto="settings.to" />
  </div>
</template>

<script>
import ProceedButton from "../misc/ProceedButton.vue";
export default {
  props: {
    settings: Object,
  },
  components: {
    ProceedButton,
  },
  data() {
    return {
      ended: false,
    };
  },
  mounted() {
    this.$store.commit("path/freeze", true);
  },
  methods: {
    onEnd() {
      if (!this.ended) {
        this.ended = true;
        this.$store.commit("path/freeze", false);
      }
    },
  },
};
</script>

<style lang="scss">
.concert {
  position: absolute;
  top: 10%;
  left: 20%;
  z-index: 10000;
  max-width: 400px;
  padding: 1em 2em;
  background: white;
  border: 1px solid grey;

  h4 {
    margin-top: -1.5em;
    margin-bottom: 1em;

    span {
      background: white;
      border: 1px solid grey;
      padding: 0.2em;
    }
  }
}
</style>