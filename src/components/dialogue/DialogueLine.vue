<template>
  <div :class="classDef()">
    <span class="speaker" v-if="showUser">{{ content.speaker }}</span>
    <span class="speaker" v-else></span>
    <span class="text">{{ content.text }}</span>
  </div>
</template>

<script>
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
    };
    // console.log(this.content);
  },
  mounted() {
    // console.log(this.content);
    this.$nextTick(() => {
      document
        .querySelector(`.conversation.${this.parent} .${this.myID}`)
        .scrollIntoView({ block: "end", behavior: "smooth" });
    });
  },
  methods: {
    classDef() {
      let retval = "dialogue-line";
      // console.log(this.content);
      // console.log(this.previous);
      if (this.content.speaker != this.previous.speaker) {
        retval = retval + " new-speaker";
      } else {
        this.showUser = false;
      }

      this.myID = `${this.content.speaker}-${this.index}`;
      retval += ` ${this.myID}`;

      return retval;
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
}
.speaker {
  text-align: right;
  margin-right: 1.5em;
  margin-top: 0.5em;
  min-width: 50px;
}
</style>