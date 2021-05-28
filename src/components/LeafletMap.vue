<template>
  <div class="mapWrap">
    <p class="you-are-here" v-if="isMini">
      {{ cityDetails.city }},
      <span v-if="'region' in cityDetails">{{ cityDetails.region }}, </span
      >{{ cityDetails.country }}
    </p>
    <div id="mapContainer" :data-layout="layout"></div>
    <BigHello @after-opening="$emit('after-opening')" />
  </div>
</template>

<script>
import BigHello from "./misc/BigHello.vue";
import MapHolder from "../utils/MapHolder";
let map = {};

export default {
  name: "LeafletMap",
  components: { BigHello },
  data() {
    return {
      isMounted: false,
      isMini: false,
    };
  },
  computed: {
    city() {
      return this.$store.state.path.currentCity;
    },
    layout() {
      return this.$store.state.layout;
    },
    path() {
      return this.$store.getters["path/getPathCoords"];
    },
    cityDetails() {
      return this.$store.getters["path/getCurrentCityInfo"];
    },
  },
  watch: {
    layout: function (newV, oldV) {
      // console.log("layout watch");
      if (this.isMounted) {
        // console.log(newV, oldV);
        if (
          (newV == "chapter" && oldV == "map") ||
          (newV == "chapter" && oldV == "")
        ) {
          document.querySelector("#mapContainer").classList.add("mini-map");
          map.toMiniMap(this.city);
          this.isMini = true;
        } else if (newV == "map" && oldV == "chapter") {
          document.querySelector("#mapContainer").classList.remove("mini-map");
          map.transitionAndEnlarge(this.city);
        }
      }
    },
    city(newV) {
      map.addCityMarker(newV);
      map.transitionAndEnlarge(newV);
    },
  },
  mounted() {
    this.isMounted = true;
    map = new MapHolder(this.path, this.mapMarkerClick);

    // map.openingAnimation(() => {
    //   this.$store.commit("openHello");
    // });
    this.$emit("after-opening");
  },
  beforeDestroy() {
    if (map) {
      map.remove();
    }
  },
  methods: {
    mapMarkerClick(e) {
      this.$store.commit("openModal", true);
      this.$store.commit("path/changeCity", e.target.options.customIndex);
      this.$store.commit("changeLayout");
      // map.invalidateSize();
    },
    cityText() {
      let txt = this.cityDetails.city + ", ";
      txt += "region" in this.cityDetails ? this.cityDetails + ", " : "";
      txt += this.cityDetails.country;

      return txt;
    },
  },
};
</script>

<style lang="scss">
#mapContainer {
  margin: 0 auto;
  width: 100vw;
  height: 100vh;

  &.mini-map {
    --city-text: "";
    border-radius: 5px;
    width: 180px;
    height: 180px;
    padding: 0.5em;
    border: 1px solid grey;
    position: absolute !important;
    bottom: 0.5em;
    right: 0.5em;

    .leaflet-control-attribution {
      display: none;
    }

    &::before {
      content: var(--city-text);
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
.you-are-here {
  background-color: white;
  font-size: 0.7em;
  position: absolute;
  bottom: 190px;
  right: 1em;
  text-align: right;
  margin: 0;
  z-index: 1000;
  max-width: 150px;
}
</style>