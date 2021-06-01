<template>
  <div class="ipv4-viewer window">
    <h4>the IPv4 packet</h4>
    <div class="packet">
      <div
        v-for="(item, index) in struct"
        :key="index"
        :class="{
          item: true,
          highlight: determineHighlight(item.code),
        }"
        :style="elemWidth(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IPv4Packet",
  props: {
    settings: Object,
  },
  data() {
    return {
      struct: [
        {
          name: "Version",
          code: "version",
          bits: 4,
        },
        {
          name: "IHL",
          shortname: "IHL",
          code: "ihl",
          bits: 4,
        },
        {
          name: "Type of Service",
          shortname: "Type",
          code: "typeOfService",
          bits: 8,
        },
        {
          name: "Total Length",
          shortname: "Length",
          code: "totalLength",
          bits: 16,
        },
        {
          name: "Identification",
          shortname: "ID",
          code: "identification",
          bits: 16,
        },
        {
          name: "Flags",
          code: "flag",
          bits: 3,
        },
        {
          name: "Fragment Offset",
          shortname: "Offset",
          code: "fragOff",
          bits: 13,
        },
        {
          name: "Time to Live",
          shortname: "TTL",
          code: "ttl",
          bits: 8,
        },
        {
          name: "Protocol",
          code: "protocol",
          bits: 8,
        },
        {
          name: "Header Checksum",
          shortname: "Checksum",
          code: "headerChecksum",
          bits: 16,
        },
        {
          name: "Source Address",
          shortname: "Source",
          code: "source",
          bits: 32,
        },
        {
          name: "Destination Address",
          shortname: "Source",
          code: "destination",
          bits: 32,
        },
        {
          name: "Data",
          shortname: "Source",
          code: "data",
          bits: 32,
        },
      ],
      persistentHighlight: [],
    };
  },
  computed: {
    lineIndex() {
      return this.$store.state.path.lineIndex;
    },
  },
  mounted() {
    this.getLine();
  },
  watch: {
    lineIndex() {
      this.getLine();
    },
  },
  methods: {
    getLine() {
      const line = this.$store.getters["path/getLine"];
      // console.log("inside ipv4");
      // console.log(line);
      // console.log(this.$store.getters["path/getScene"]);
      // console.log(
      //   `${this.lineIndex} ${line.speaker}: ${line.text.substring(0, 20)}`
      // );
      if (line != null && "highlight" in line) {
        this.persistentHighlight = line.highlight;
      }
    },
    elemWidth(item) {
      return `--block-width: ${item.bits}`;
    },
    determineHighlight(code) {
      return (
        "highlight" in this.settings && this.settings.highlight.includes(code)
      );
      // return this.persistentHighlight.includes(code);
      // if (highlight != null && highlight.includes(code)
    },
  },
};
</script>

<style lang="scss">
.ipv4-viewer {
  min-width: 520px;
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  width: 40%;

  .packet {
    display: grid;
    grid-gap: 2px;
    grid-template-columns: repeat(32, 1fr);

    .item {
      // background-color: grey;
      border: 1px solid grey;
      font-size: 0.85em;
      grid-column: span var(--block-width);
      letter-spacing: -0.9px;
      padding: 0.75em 0.5em;
      text-align: center;

      &.highlight {
        background-color: yellow;
      }
    }
  }

  h4 {
    margin-top: 0;
  }
}
</style>