<template>
  <div class="drag-drop">
    <div
      class="dragged-element"
      draggable
      @dragstart="startDrag($event)"
      :style="dragStyle()"
    >
      <img v-if="!imgIsDropped" name="drag-el" :src="settings.img" />
    </div>
    <div
      :style="dropStyle()"
      class="drop-zone"
      @drop.prevent="onDrop($event)"
      @dragover.prevent
      @dragenter.prevent
    >
      <img v-if="imgIsDropped" name="drop-zone" :src="settings.img" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DragAndDrop",
  props: {
    dropText: {
      type: String,
      default: "Drop your image here!",
    },
    settings: Object,
  },
  data() {
    return {
      imgIsDropped: false,
    };
  },
  mounted() {
    this.$store.commit("path/freeze", true);
  },
  methods: {
    startDrag: (e) => {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("isDrag", true);
      document.querySelector(".drop-zone").classList.add("waiting");
    },
    onDrop(e) {
      const state = e.dataTransfer.getData("isDrag");
      this.imgIsDropped = state;
      document.querySelector(".drop-zone").classList.remove("waiting");
      document.querySelector(".drop-zone").classList.add("done");

      this.$store.commit("path/freeze", false);
      this.$store.dispatch("path/next");
    },
    dragStyle() {
      let retval = "";
      retval +=
        "dragBackground" in this.settings
          ? `--drag-bg: url('${this.settings.dragBackground.file}');`
          : "";

      return retval;
    },
    dropStyle() {
      let retval = "";
      retval +=
        "dropText" in this.settings
          ? `--drop-text: '${this.settings.dropText}'; `
          : "";

      retval +=
        "dropImg" in this.settings
          ? `--drop-img: url('${this.settings.dropImg}'); `
          : "";

      return retval;
    },
  },
};
</script>

<style lang="scss">
.drag-drop {
  --dragging-size: 300px;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 1000;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.25);
    z-index: -1;
  }

  .dragged-element,
  .drop-zone {
    background-color: aliceblue;
    box-shadow: inset 3px 3px 7px rgba(70, 70, 70, 0.6),
      -1px -1px 3px 1px #ffffff54;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: var(--dragging-size);
    height: var(--dragging-size);
  }

  .dragged-element {
    img {
      min-width: 160px;
      height: auto;
    }
    &::after {
      content: "";
      position: absolute;
      bottom: -150px;
      right: -1em;
      width: calc(100% - 2em);
      height: 200px;
      background-image: var(--drag-bg);
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.75;
      z-index: -1;
    }
  }

  .drop-zone {
    --drop-text: "";
    --drop-img: "";

    &.waiting {
      box-shadow: 0px 0px 1px 5px yellow;
    }

    &::before,
    &::after {
      position: absolute;
    }

    &::before {
      background-image: var(--drop-img);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50%;
      content: "";
      z-index: 0;
      width: 90%;
      height: 90%;
    }

    &::after {
      content: var(--drop-text);
      font-size: 1.5em;
      line-height: 1.15;
      font-weight: bold;
      justify-self: center;
      text-align: center;
      width: 70%;
      text-shadow: 1px 1px 0 white, -1px -1px 0 white, -1px 1px 0 white,
        1px -1px 0 white;
    }

    &.done::after {
      display: none;
    }
  }
}
</style>