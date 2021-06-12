<template>
  <div class="big-text">
    <h1>{{ myText }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    content: Object,
  },
  data() {
    return {
      myText: "",
    };
  },
  watch: {
    content(newV) {
      if (newV.text != "" && newV.text != null) {
        console.log(newV);
        this.myText = newV;
      }
    },
  },
  mounted() {
    console.log(this.content);
    this.myText = this.content.text;
  },
};
</script>

<style lang="scss">
.big-text {
  width: 30%;
  transform: rotate(-20deg);
  position: absolute;
  top: 30%;
  right: 20%;
  z-index: 100;

  h1 {
    color: #67ff5e;
    font-size: 4em;
    margin: 0;
    line-height: 0.65;
    text-shadow: -1px -1px 0 #cccccc, 1px -1px 0 #808080, -1px 1px 0 #7d7d7d,
      1px 1px 0 #7d7d7d, 3px 8px 0 rgba(0, 0, 0, 0.55);
  }
}
</style>