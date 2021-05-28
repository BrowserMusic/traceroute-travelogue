<template>
  <div class="animation-manager">
    <CharacterDisplay
      v-if="isVisible('character')"
      :name="getCompSettings('character').name"
      :align="getCompSettings('character').align"
      :settings="getCompSettings('character')"
    />
    <IPv4Packet v-if="isVisible('ipv4')" />
    <BigSideText
      v-if="isVisible('bigtext')"
      :content="getCompSettings('bigtext')"
    />
    <BigButton
      v-if="isVisible('bigbutton')"
      :text="getCompSettings('bigbutton').text"
    />
    <OrbPamphlet
      v-if="isVisible('pamphlet')"
      :page="getCompSettings('pamphlet').page"
      :settings="getCompSettings('pamphlet')"
    />
    <hub-zone v-if="isVisible('hub')" :settings="getCompSettings('hub')" />
    <error-text
      v-if="isVisible('error')"
      :settings="getCompSettings('error')"
    />
    <div class="handout" loading="lazy" v-if="isVisible('link')">
      <a :href="getCompSettings('link').url" target="_blank">
        <img :src="getCompSettings('link').img" />
        <h4 v-if="'text' in getCompSettings('link')">
          {{ getCompSettings("link").text }}
        </h4>
      </a>
    </div>
    <image-on-timer
      v-if="isVisible('img-timer')"
      :settings="getCompSettings('img-timer')"
    />
    <!-- <div class="solo-img" v-if="isVisible('solo-img')">
      <img :src="getCompSettings('solo-img').img" />
    </div> -->
    <!-- <proceed-button /> -->
  </div>
</template>

<script>
import IPv4Packet from "./attractions/IPv4Packet.vue";
import BigSideText from "./misc/BigSideText.vue";
import CharacterDisplay from "./dialogue/CharacterDisplay.vue";
import BigButton from "./misc/BigButton.vue";
import ProceedButton from "./misc/ProceedButton.vue";
import OrbPamphlet from "./attractions/OrbPamphlet.vue";
import HubZone from "./attractions/HubZone.vue";
import ErrorText from "./misc/ErrorText.vue";
import ImageOnTimer from "./misc/ImageOnTimer.vue";

export default {
  name: "AnimationManager",
  components: {
    IPv4Packet,
    BigSideText,
    CharacterDisplay,
    BigButton,
    ProceedButton,
    OrbPamphlet,
    HubZone,
    ErrorText,
    ImageOnTimer,
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
      compstate: [],
    };
  },
  methods: {
    toNextStep() {
      this.$emit("end-scene");
    },
    changeVisibility() {
      for (let item of this.scene.components) {
        let changed = false;
        for (let i = 0; i < this.compstate.length; i++) {
          if (item.name == this.compstate[i].name) {
            this.compstate[i] = item;
            changed = true;
          }
        }

        if (!changed) {
          this.compstate.push(item);
        }
      }
      console.log(this.compstate);
      this.$forceUpdate();
    },
    isVisible(slug) {
      const comp = this.getComponent(slug);
      return comp != null && comp.state != "stop";
    },
    getComponent(slug) {
      const filtered = this.compstate.filter((s) => s.name == slug);
      if (filtered.length > 0) {
        return filtered[0];
      }

      return null;
      // return this.compstate.filter((s) => s.name == slug)[0];
    },
    getCompSettings(slug) {
      const myComp = this.getComponent(slug);
      return myComp != null && "settings" in myComp ? myComp.settings : {};
    },
  },
};
</script>

<style lang="scss">
.sideImage {
  position: absolute;
  right: 20%;
  top: 40%;
}

.handout,
.solo-img {
  border: 3px solid white;
  box-shadow: 0px 0px 0px 1px black;
  position: absolute;
  bottom: 1em;
  right: 200px;
  max-width: 500px;

  img {
    width: 100%;
  }

  h4 {
    position: absolute;
    top: 1em;
    left: 2em;
  }
}

// .handout {
//   background-image: var(--img-link-bg);
//   background-
// }
</style>