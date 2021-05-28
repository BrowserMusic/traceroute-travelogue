<template>
  <div class="error-alert-wrap">
    <div class="error-alert">
      <h4>Error</h4>
      <p>{{ settings.text }}</p>
      <proceed-button :text="'OK'" :goto="hasGoto()" :locked="true" />
    </div>
  </div>
</template>

<script>
import ProceedButton from "./ProceedButton.vue";

export default {
  components: { ProceedButton },
  props: {
    settings: Object,
  },
  methods: {
    hasGoto() {
      console.log(this.settings);
      if ("to" in this.settings) {
        return this.settings.to;
      } else {
        return null;
      }
    },
  },
};
</script>

<style lang="scss">
.error-alert-wrap {
  background-color: #9e9e9e7d;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .error-alert {
    background-color: #f3f1e8;
    border: 5px outset #c19090;
    padding: 1em;
    width: 500px;

    h4 {
      margin: 0;
      margin-top: 0.5em;
    }
  }
}
</style>