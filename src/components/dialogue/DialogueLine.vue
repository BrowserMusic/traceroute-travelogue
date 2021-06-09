<template>
  <div :class="classDef()">
    <template v-if="!isAlert">
      <span class="speaker" v-if="showUser">{{ content.speaker }}</span>
      <span class="speaker" v-else></span>
      <span class="text" v-html="parsedText(content.text)"></span
    ></template>
    <template v-else>
      <span class="notice">{{ parsedText(content.text) }}</span>
    </template>
  </div>
</template>

<script>
const marked = require("marked");

export default {
  name: "DialogueLine",
  props: {
    content: Object,
    previous: Object,
    index: Number,
    parent: String,
  },
  data() {
    return {
      showUser: true,
      myID: "",
      isAlert: false,
    };
    // console.log(this.content);
  },
  mounted() {
    if (this.content.speaker == "notice") {
      this.isAlert = true;
    }

    this.$nextTick(() => {
      document
        .querySelector(`.conversation.${this.parent} .${this.myID}`)
        .scrollIntoView({ block: "end", behavior: "smooth" });
    });
  },
  methods: {
    classDef() {
      let retval = "dialogue-line";
      if (this.content.speaker != this.previous.speaker) {
        retval = retval + " new-speaker";
      } else {
        this.showUser = false;
      }

      this.myID = `${this.content.speaker.trim()}-${this.index}`;
      retval += ` ${this.myID}`;

      return retval;
    },
    parsedText(text) {
      const renderer = new marked.Renderer();
      const linkRenderer = renderer.link;
      renderer.link = (href, title, text) => {
        const html = linkRenderer.call(renderer, href, title, text);
        return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ');
      };
      // const html = marked(markdown, { renderer });

      const t = marked.parseInline(text, { renderer });
      var res = t
        .split("[[redacted]]")
        .join("<span class='redact'>▥▤▧▩</span>");

      return res;
    },
  },
};
</script>

<style lang="scss">
.dialogue-line {
  display: flex;

  &.new-speaker {
    margin-top: 1em;
  }
  /* padding: 1em; */

  .text {
    // border: 1px solid grey;
    background-color: aliceblue;
    border-radius: 2px;
    margin-top: 0.25em;
    padding: 0.25em 0.5em;
  }

  .speaker {
    text-align: right;
    margin-right: 1.5em;
    margin-top: 0.5em;
    min-width: 50px;
  }
  .notice {
    display: block;
    font-weight: bold;
    color: #4a4a4a;
    padding: 1em 0;
    text-align: center;
    width: 100%;
  }
}

.redact {
  text-shadow: 2px -2px 0 blue, -1px -1px 0 red, 3px 1px 0 green;
  letter-spacing: -2px;
  margin-right: 5px;
}
</style>