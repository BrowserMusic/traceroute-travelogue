<template>
  <div class="conversation-manager">
    <Conversation
      v-for="(label, index) in conversationIDs"
      :key="index"
      :label="label"
      :isFocus="isFocus"
      :isActiveConvo="activeConvo == index"
      :scenes="getScenesByConvo(label)"
      @end-scene="$emit('end-scene')"
    />

    <BigDialogue
      :scene="
        nextScene != null && 'id' in nextScene && nextScene.id == 'large'
          ? nextScene
          : {}
      "
    />
  </div>
</template>

<script>
import BigDialogue from "./BigDialogue.vue";
import Conversation from "./Conversation.vue";
export default {
  components: { Conversation, BigDialogue },
  props: {
    nextScene: Object,
    isFocus: Boolean,
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
        this.addNewScene(newV);
      }
    },
  },
  mounted() {
    this.addNewScene(this.nextScene);
  },
  methods: {
    getScenesByConvo(label) {
      // console.log("running scenes by convo");
      const retval = this.scenes.filter((s) => {
        if (s.id == label) {
          return s.lines;
        }
      });

      // console.log(retval);
      return retval;
    },
    addNewScene(scene) {
      if (scene == null) return;
      if (!this.conversationIDs.includes(scene.id) && scene.id != "large") {
        this.conversationIDs.push(scene.id);
      }
      this.activeConvo = scene.level - 1;
      this.scenes.push(scene);
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