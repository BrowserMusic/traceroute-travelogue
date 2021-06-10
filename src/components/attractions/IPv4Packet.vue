<template>
  <div class="packet-container" :data-scene="sceneIndex">
    <packet
      v-for="(t, index) in toShow.main"
      :index="index"
      type="main"
      :key="index"
      :data="types[t]"
      :sub="getSub()"
      :highlight="determineHighlight"
      :listeningFor="listeningFor"
    />
  </div>
</template>

<script>
import Packet from "./Packet.vue";

export default {
  components: { Packet },
  name: "IPv4Packet",
  props: {
    settings: Object,
  },
  data() {
    return {
      types: {
        ip: {
          name: "ip",
          title: "the IPv4 packet",
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
              shortname: "Destination",
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
        },
        udp: {
          name: "udp",
          title: "the UDP datagram",
          struct: [
            {
              name: "Source port #",
              shortname: "Source",
              code: "source",
              bits: 16,
            },
            {
              name: "Destination port #",
              shortname: "Destination",
              code: "destination",
              bits: 16,
            },
            {
              name: "Segment Length",
              shortname: "Length",
              code: "segLength",
              bits: 16,
            },
            {
              name: "Checksum",
              shortname: "Checksum",
              code: "checksum",
              bits: 16,
            },
            {
              name: "Data",
              shortname: "Data",
              code: "data",
              bits: 32,
            },
          ],
        },
        tcp: {
          name: "tcp",
          title: "the TCP datagram",
          struct: [
            {
              name: "Source port #",
              shortname: "Source",
              code: "source",
              bits: 16,
            },
            {
              name: "Destination port #",
              shortname: "Destination",
              code: "destination",
              bits: 16,
            },
            {
              name: "Sequence Number",
              shortname: "Sequence",
              code: "seqNum",
              bits: 32,
            },
            {
              name: "Acknowledgement Number",
              shortname: "Acknowledgement",
              code: "ackNum",
              bits: 32,
            },
            {
              name: "Data Offset",
              shortname: "Offset",
              code: "dataOff",
              bits: 4,
            },
            {
              name: "Reserved",
              shortname: "Reserved",
              code: "reserved",
              bits: 6,
            },
            {
              name: "URG",
              shortname: "URG",
              code: "urg",
              flag: true,
              bits: 1,
            },
            {
              name: "ACK",
              shortname: "ACK",
              code: "ack",
              listenable: true,
              flag: true,
              bits: 1,
            },
            {
              name: "PSH",
              shortname: "PSH",
              code: "psh",
              flag: true,
              bits: 1,
            },
            {
              name: "RST",
              shortname: "RST",
              code: "rst",
              flag: true,
              bits: 1,
            },
            {
              name: "SYN",
              shortname: "SYN",
              code: "syn",
              listenable: true,
              flag: true,
              bits: 1,
            },
            {
              name: "FIN",
              shortname: "FIN",
              code: "fin",
              flag: true,
              bits: 1,
            },
            {
              name: "Window",
              shortname: "Window",
              code: "window",
              bits: 16,
            },
            {
              name: "Checksum",
              shortname: "Checksum",
              code: "checksum",
              bits: 16,
            },
            {
              name: "Urgent pointer",
              shortname: "Urgent",
              code: "urgPoint",
              bits: 16,
            },
            {
              name: "Options (variable)",
              code: "options",
              bits: 32,
            },
            {
              name: "Data (variable)",
              code: "data",
              bits: 32,
            },
          ],
        },
        layer: {
          name: "layer",
          title: "the IP network suite",
          struct: [
            {
              name: "Application Layer",
              code: "application",
              bits: 8,
            },
            {
              name: "HTTP",
              code: "http",
              bits: 8,
            },
            {
              name: "TLS",
              code: "tls",
              bits: 8,
            },
            {
              name: "DNS",
              code: "dns",
              bits: 8,
            },
            {
              name: "Transport Layer",
              code: "transport",
              bits: 8,
            },
            {
              name: "UDP",
              code: "udp",
              bits: 12,
            },
            {
              name: "TCP",
              code: "tcp",
              bits: 12,
            },
            {
              name: "Network Layer",
              code: "network",
              bits: 8,
            },
            {
              name: "IPv4",
              code: "ipv4",
              bits: 12,
            },
            {
              name: "IPv6",
              code: "ipv6",
              bits: 12,
            },
            {
              name: "Link Layer",
              code: "link",
              bits: 8,
            },
            {
              name: "Ethernet",
              code: "ethernet",
              bits: 12,
            },
            {
              name: "Fibre-optic",
              code: "fibre",
              bits: 12,
            },
          ],
        },
      },
      toShow: {
        main: [],
        sub: [],
      },
      listeningFor: {},
      persistentHighlight: [],
    };
  },
  computed: {
    lineIndex() {
      return this.$store.state.path.lineIndex;
    },
    sceneIndex() {
      return this.$store.state.path.sceneIndex;
    },
  },
  mounted() {
    this.getLine();
  },
  watch: {
    lineIndex() {
      this.getLine();
    },
    sceneIndex() {
      this.getLine();
    },
  },
  methods: {
    getLine() {
      const line = this.$store.getters["path/getLine"];
      if (line != null && "highlight" in line) {
        this.persistentHighlight = line.highlight;
      }
      this.whoToShow();
      this.whoToListen();
    },
    whoToListen() {
      if ("listeningFor" in this.settings && this.settings.listeningFor) {
        console.log(this.listeningFor);
        this.$store.commit("path/freeze", true);
        this.listeningFor = this.settings.listeningFor;
      } else {
        this.listeningFor = {};
      }
    },
    whoToShow() {
      if ("toShow" in this.settings) {
        this.toShow = {
          main: [],
          sub: [],
        };

        for (let i of this.settings.toShow) {
          switch (i) {
            case "ip":
              this.toShow.main.push(i);
              continue;
            case "layer":
              this.toShow.main.push(i);
              continue;
            case "udp":
              this.toShow.sub.push(i);
              continue;
            case "tcp":
              this.toShow.sub.push(i);
              continue;
          }
        }
      }
    },
    determineHighlight(type, code) {
      return (
        this.settings != null &&
        "highlight" in this.settings &&
        type in this.settings.highlight &&
        this.settings.highlight[type].includes(code)
      );
      // return this.persistentHighlight.includes(code);
      // if (highlight != null && highlight.includes(code)
    },
    getSub() {
      if (this.toShow.sub.length > 0) {
        return this.types[this.toShow.sub[0]];
      } else {
        return null;
      }
    },
  },
};
</script>

<style lang="scss">
.packet-viewer {
  background-color: #fdeeee !important;
  min-width: 600px;
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  width: 40%;

  .packet {
    display: grid;
    grid-gap: 2px;
    grid-template-columns: repeat(32, 1fr);

    .item {
      background-color: white;
      border: 1px solid grey;

      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      font-size: 0.85em;
      grid-column: span var(--block-width);
      letter-spacing: -0.4px;
      padding: 0.75em 0.5em;
      text-align: center;
      word-break: break-word;

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