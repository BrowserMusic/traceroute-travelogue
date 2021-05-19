<template>
  <div class="conversation-manager">
    <Conversation
      v-for="(label, index) in conversationIDs"
      :key="index"
      :label="label"
      :scenes="getScenesByConvo(label)"
      @end-scene="$emit('end-scene')"
      @next-step="toNextStep()"
    />
  </div>
</template>

<script>
import Conversation from "./Conversation.vue";
export default {
  components: { Conversation },
  props: {
    sceneIndex: Number,
    nodeIndex: Number,
    nextScene: Object,
  },
  data() {
    return {
      activeConvo: 0,
      scenes: [],
      conversationIDs: [],
    };
  },
  watch: {
    nextScene(newV, oldV) {
      if (newV !== oldV && newV != null) {
        if (!this.conversationIDs.includes(newV.id)) {
          this.conversationIDs.push(newV.id);
        }
        this.scenes.push(newV);
      }
    },
  },
  methods: {
    getScenesByConvo(label) {
      return this.scenes.filter((s) => {
        if (s.id == label) {
          return s.lines;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.conversation-manager .tutorial {
  position: absolute;
  top: 3em;
  left: 3em;
}
</style>