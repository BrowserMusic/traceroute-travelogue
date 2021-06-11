<template>
  <div class="http-request window" :data-line="lineIndex">
    <p>
      <span :class="highlight('method')">{{ persist.method }} </span>
      <span :class="highlight('query')">{{ persist.query }}</span>
      <span>{{ persist.version }}</span>
    </p>
    <p :class="highlight('host')">
      Host:
      <!-- <span>{{ persist.host }}</span> -->
      <span
        v-if="'host' in persist && isRedacted(persist.host)"
        class="redact-host"
      >
        www.<span class="redact">▥▤▧▩</span>.com</span
      >
      <span v-else-if="'host' in persist">{{ persist.host }}</span>
    </p>
    <p :class="highlight('agent')">User-Agent: {{ getUserAgent() }}</p>
    <p>Accept: */*</p>
    <p v-if="'data' in persist"></p>
    <pre v-if="'data' in persist" :class="highlight('data')">
      {{ processJSON(persist.data) }}
    </pre>
  </div>
</template>

<script>
export default {
  props: {
    settings: Object,
  },
  data() {
    return {
      persist: {},
    };
  },
  computed: {
    lineIndex() {
      return this.$store.state.path.lineIndex;
    },
  },
  watch: {
    lineIndex() {
      // console.log(this.settings);
      this.persist = {
        ...this.persist,
        ...this.settings,
      };
    },
  },
  mounted() {
    this.persist = {
      ...this.persist,
      ...this.settings,
    };
  },
  methods: {
    highlight(code) {
      // console.log(code);
      if (this.settings.highlight == code) {
        return "highlight";
      }
    },
    processJSON(data) {
      if (typeof data == "string") {
        return data;
      }

      return JSON.stringify(data, null, 2);
    },
    getUserAgent() {
      if ("agent" in this.settings) {
        return this.settings.agent;
      }
      return navigator.userAgent;
    },
    isRedacted(str) {
      if (str.includes("redacted")) {
        return true;
        // return "<span class='redacted'></span>";
      }
      return false;
    },
  },
};
</script>

<style lang="scss">
.http-request {
  font-family: "Courier New", monospace;
  position: absolute;
  top: 10em;
  right: 2em;
  min-width: 200px;
  max-width: 450px;
  padding: 1em;

  .highlight {
    background-color: yellow;
    font-weight: bold;
  }

  span {
    margin-right: 1em;
  }

  .redact-host span {
    margin-right: 0;
  }
  .redact {
    letter-spacing: 3px;
  }
}
</style>