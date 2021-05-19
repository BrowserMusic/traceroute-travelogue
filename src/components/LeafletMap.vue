<template>
  <div id="mapContainer" :data-layout="layout"></div>
</template>

<script>
import MapHolder from "../utils/MapHolder";
let map = {};

export default {
  name: "LeafletMap",
  data() {
    return {
      isMounted: false,
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
        } else if (newV == "map" && oldV == "chapter") {
          document.querySelector("#mapContainer").classList.remove("mini-map");
          map.transitionAndEnlarge(this.city);
        }
      }
    },
  },
  mounted() {
    this.isMounted = true;
    map = new MapHolder(this.path, this.mapMarkerClick);
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
  },
};
</script>

<style lang="scss">
#mapContainer {
  margin: 0 auto;
  width: 100vw;
  height: 100vh;

  &.mini-map {
    border-radius: 5px;
    width: 200px;
    height: 200px;
    position: absolute !important;
    bottom: 0;
    right: 0;
  }
}
</style>