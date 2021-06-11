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

    <div
      class="handout"
      loading="lazy"
      v-if="isVisible('link')"
      :style="handoutStyle(getSettings('link'))"
    >
      <a :href="getSettings('link').url" target="_blank">
        <img :src="getSettings('link').img" />
        <h4 v-if="'text' in getSettings('link')">
          {{ getSettings("link").text }}
        </h4>
      </a>
    </div>

    <image-on-timer
      v-if="isVisible('imgtimer')"
      :settings="getSettings('imgtimer')"
    />

    <drag-and-drop
      v-if="isVisible('draganddrop')"
      :settings="getSettings('draganddrop')"
    />

    <HTTPRequest v-if="isVisible('http')" :settings="getSettings('http')" />

    <resource-timer
      v-if="isVisible('resourcetimer')"
      :settings="getSettings('resourcetimer')"
    />

    <media-background
      v-if="isVisible('mediabg')"
      :settings="getSettings('mediabg')"
    />

    <div class="single-video" v-if="isVisible('video')">
      <video loop muted autoplay playsinline>
        <source :src="getSettings('video').src" type="video/mp4" />
      </video>
      <p v-if="'text' in getSettings('video')">
        {{ getSettings("video").text }}
      </p>
      <proceed-button
        :text="'Who took this footage?'"
        :goto="getSettings('video').to"
      />
    </div>

    <concert v-if="isVisible('concert')" :settings="getSettings('concert')" />
    <gif-mess v-if="isVisible('gifmess')" :settings="getSettings('gifmess')" />
    <fine-dining v-if="isVisible('dining')" :settings="getSettings('dining')" />
  </div>
</template>

<script>
import IPv4Packet from "./attractions/IPv4Packet.vue";
import BigSideText from "./misc/BigSideText.vue";
import CharacterDisplay from "./dialogue/CharacterDisplay.vue";
import BigButton from "./misc/BigButton.vue";
import OrbPamphlet from "./attractions/OrbPamphlet.vue";
import HubZone from "./attractions/HubZone.vue";
import ErrorText from "./misc/ErrorText.vue";
import ImageOnTimer from "./misc/ImageOnTimer.vue";
import DragAndDrop from "./attractions/DragAndDrop.vue";
import MediaBackground from "./misc/MediaBackground.vue";
import Concert from "./attractions/Concert.vue";
import ProceedButton from "./misc/ProceedButton.vue";
import GifMess from "./attractions/GifMess.vue";
import FineDining from "./dining/FineDining.vue";
import HTTPRequest from "./attractions/HTTPRequest.vue";
import ResourceTimer from "./attractions/ResourceTimer.vue";

export default {
  name: "AnimationManager",
  components: {
    IPv4Packet,
    BigSideText,
    CharacterDisplay,
    BigButton,
    OrbPamphlet,
    HubZone,
    ErrorText,
    ImageOnTimer,
    DragAndDrop,
    MediaBackground,
    Concert,
    ProceedButton,
    GifMess,
    FineDining,
    HTTPRequest,
    ResourceTimer,
  },
  props: {
    scene: Object,
    isFocus: Boolean,
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
    isVisible(slug) {
      return slug in this.compList;
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
    },
    getCompSettings(slug) {
      const myComp = this.getComponent(slug);
      return myComp != null && "settings" in myComp ? myComp.settings : {};
    },
    handoutStyle(sett) {
      // console.log(sett);
      let retval = "";
      if ("width" in sett) {
        retval = "width: " + sett.width + ";";
      }

      // console.log(retval);
      return retval;
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
.solo-img,
.single-video {
  background-color: white;
  border: 3px solid white;
  box-shadow: 0px 0px 0px 1px black;
  position: absolute;
  bottom: 1em;
  right: 200px;
  max-width: 500px;

  img {
    width: 100%;
  }
}

.single-video {
  max-width: 230px;
  padding: 1em;
  bottom: 5em;
  right: 260px;

  video {
    width: 100%;
  }
}

.handout a {
  color: blue;
  text-shadow: 1px 1px 0 white, -1px -1px 0 white, -1px 1px 0 white,
    1px -1px 0 white;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  h4 {
    font-size: 1.3em;
    position: absolute;
    // top: 1em;
    // left: 2em;
    width: 80%;
  }
}
</style>
