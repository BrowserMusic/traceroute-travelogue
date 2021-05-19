<template>
  <div class="animation-manager">
    <p v-if="images[0].show" class="sideImage">
      <img :src="images[0].file" alt="floating head" />
    </p>
    <!-- <p v-else>{{ scene }}</p> -->
    <IPv4Packet
      v-if="'components' in scene && scene.components.includes('ipv4')"
    />
    <button v-if="isFocus" @click.prevent="$emit('end-scene')">Proceed</button>
  </div>
</template>

<script>
import IPv4Packet from "./attractions/IPv4Packet.vue";

export default {
  name: "AnimationManager",
  components: {
    IPv4Packet,
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
    };
  },
  methods: {
    toNextStep() {
      this.$emit("end-scene");
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