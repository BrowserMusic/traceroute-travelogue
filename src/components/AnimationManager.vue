<template>
  <div class="animation-manager">
    <p v-if="images[0].show" class="sideImage">
      <img :src="images[0].file" alt="floating head" />
    </p>
    <IPv4Packet v-if="isVisible('ipv4')" />
    <BigSideText
      v-if="isVisible('bigtext')"
      :content="getCompSettings('bigtext')"
    />
    <button v-if="isFocus" @click.prevent="$emit('end-scene')">Proceed</button>
  </div>
</template>

<script>
import IPv4Packet from "./attractions/IPv4Packet.vue";
import BigSideText from "./attractions/BigSideText.vue";

export default {
  name: "AnimationManager",
  components: {
    IPv4Packet,
    BigSideText,
  },
  props: {
    scene: Object,
    isFocus: Boolean,
  },
  watch: {
    scene: {
      immediate: true,
      deep: true,
      handler(newV) {
        if (newV.scene == "zakRemoveHead") {
          this.images[0].show = true;
        }
        if ("components" in newV) {
          console.log("we have components!!");
          this.changeVisibility();
        }
      },
    },
  },
  data() {
    return {
      images: [
        {
          file: "/images/floating_head.gif",
          show: false,
        },
      ],
      compstate: {},
    };
  },
  methods: {
    toNextStep() {
      this.$emit("end-scene");
    },
    changeVisibility() {
      for (let item of this.scene.components) {
        this.compstate[item.name] = item.state;
      }
      this.$forceUpdate();
    },
    isVisible(slug) {
      return slug in this.compstate && this.compstate[slug] != "stop";
    },
    getCompSettings(slug) {
      const myComp = this.scene.components.filter((s) => s.name == slug)[0];
      return myComp != null && "settings" in myComp ? myComp.settings : {};
    },
  },
};
</script>

<style>
.sideImage {
  position: absolute;
  right: 20%;
  top: 40%;
}
</style>