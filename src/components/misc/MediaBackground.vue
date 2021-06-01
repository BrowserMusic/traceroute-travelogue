<template>
  <div :class="getClass()" :style="getStyle()">
    <video v-if="getType() == 'video'" autoplay loop muted playsinline>
      <source :src="settings.src" type="video/mp4" />
    </video>
    <!-- <img v-else-if="getType() == 'image'" :src="settings.src" /> -->
  </div>
</template>

<script>
export default {
  props: {
    settings: Object,
  },
  methods: {
    getType() {
      if (this.settings.type == "video") {
        return "video";
      } else if (this.settings.type == "image") {
        return "image";
      }

      return "";
    },
    getStyle() {
      if (this.getType() == "image") {
        return `--media-bg-image: url('${this.settings.src}');`;
      }

      return "";
    },
    getClass() {
      let retval = `media-background ${this.getType()}-background `;
      retval +=
        "orientation" in this.settings &&
        this.settings.orientation == "vertical"
          ? "vertical-video "
          : "";
      return retval;
    },
  },
};
</script>

<style lang="scss">
.media-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  video {
    width: 100%;
    height: 100%;
  }

  &.image-background {
    background-image: var(--media-bg-image);
    background-size: cover;
  }
}

.media-background.vertical-video {
  top: -50%;

  video {
    height: auto;
  }
}
</style>