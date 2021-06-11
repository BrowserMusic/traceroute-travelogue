<template>
  <div :class="'packet-viewer window packet-' + index + ' packet-' + type">
    <h4>{{ data.title }}</h4>
    <div class="packet">
      <div
        v-for="(item, index) in data.struct"
        :key="index"
        :class="{
          item: true,
          flag: 'flag' in item,
          highlight: highlight(data.name, item.code),
          makeObvious: isListenedFor(item.code),
        }"
        :style="elemWidth(item)"
        @click.prevent="interactWith(item.code)"
      >
        {{ item.name }}

        <packet
          v-if="sub != null && item.code == 'data'"
          type="sub"
          :data="sub"
          :highlight="highlight"
          :index="index"
          :listeningFor="listeningFor"
        />
        <!-- <template v-for="(f, findex) in toShow.sub" : -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Packet",
  props: {
    index: Number,
    type: String,
    data: Object,
    sub: Object,
    highlight: Function,
    listeningFor: Object,
  },
  methods: {
    elemWidth(item) {
      return `--block-width: ${item.bits}`;
    },
    interactWith(code) {
      if (this.isListenedFor(code)) {
        console.log("you clicked on", code);
        this.$store.commit("path/freeze", false);
        this.$store.dispatch("path/next");
        console.log(this.$store.state.path.freezeState);
      }
    },
    isListenedFor(code) {
      return (
        this.listeningFor != null &&
        this.listeningFor[this.data.name] != null &&
        this.listeningFor[this.data.name].includes(code)
      );
    },
  },
};
</script>

<style lang="scss">
.packet-viewer .packet-sub {
  background-color: #ecdccb !important;
  box-shadow: inset 3px 3px 3px rgba(0, 0, 0, 0.25);
  min-width: auto;
  position: relative;
  // top: 0.5em;
  // right: 0.5em;
  // width: 40%;
  margin: 0 0.5em;
  width: 100%;

  .packet .item {
    font-size: 0.95em;

    &.makeObvious {
      box-shadow: 0 0 0 10px #ff5ec8;
      // box-shadow: 0 0 0 10px orange;
      border: 5px solid aqua;
      cursor: pointer;
    }
  }

  .packet .item.flag {
    font-size: 0.7em;
    padding: 0.5em 0.2em;
    word-break: break-all;
  }
}
</style>