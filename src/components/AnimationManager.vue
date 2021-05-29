<template>
  <div class="animation-manager" :data-stuff="compList">
    <CharacterDisplay
      v-if="isVisible('character')"
      :name="getSettings('character').name"
      :align="getSettings('character').align"
      :settings="getSettings('character')"
    />
    <IPv4Packet v-if="isVisible('ipv4')" :settings="getSettings('ipv4')" />
    <BigSideText
      v-if="isVisible('bigtext')"
      :content="getSettings('bigtext')"
    />
    <BigButton
      v-if="isVisible('bigbutton')"
      :text="getSettings('bigbutton').text"
    />
    <OrbPamphlet
      v-if="isVisible('pamphlet')"
      :page="getSettings('pamphlet').page"
      :settings="getSettings('pamphlet')"
    />
    <hub-zone v-if="isVisible('hub')" :settings="getSettings('hub')" />
    <error-text v-if="isVisible('error')" :settings="getSettings('error')" />
    <div class="handout" loading="lazy" v-if="isVisible('link')">
      <a :href="getSettings('link').url" target="_blank">
        <img :src="getSettings('link').img" />
        <h4 v-if="'text' in getSettings('link')">
          {{ getSettings("link").text }}
        </h4>
      </a>
    </div>
    <image-on-timer
      v-if="isVisible('img-timer')"
      :settings="getSettings('img-timer')"
    />
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
      // images: [
      //   {
      //     file: "/images/floating_head.gif",
      //     show: false,
      //   },
      // ],
      compstate: [],
    };
  },
  computed: {
    compList() {
      const thing = this.$store.getters["path/comps/getAllActive"];
      console.log(thing);
      return thing;
    },
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
      return slug in this.compList;
      // const comp = this.getComponent(slug);
      // return comp != null && comp.state != "stop";
    },
    getSettings(slug) {
      if ("settings" in this.compList[slug]) {
        return this.compList[slug].settings;
      } else {
        return null;
      }
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
