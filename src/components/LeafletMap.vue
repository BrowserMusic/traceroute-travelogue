<template>
  <div id="mapContainer" :data-layout="layout"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
let prevLayout = "map";

export default {
  name: "LeafletMap",
  data() {
    return {
      map: null,
      prevLayout: "map",
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
  },
  watch: {
    layout: function (newV, oldV) {
      console.log("layout watch");
      if (this.isMounted) {
        console.log(newV, oldV);
        if (
          (newV == "chapter" && oldV == "map") ||
          (newV == "chapter" && oldV == "")
        ) {
          document.querySelector("#mapContainer").classList.add("mini-map");
          this.map.invalidateSize();
          this.map.setView(
            this.$store.getters["path/getCurrentCityInfo"].coords,
            6
          );
        } else if (newV == "map" && oldV == "chapter") {
          document.querySelector("#mapContainer").classList.remove("mini-map");
          this.mapTransition();
        }
      }
    },
  },
  mounted() {
    this.isMounted = true;
    this.map = L.map("mapContainer", {
      // worldCopyJump: true,
    }).setView(this.$store.getters["path/getOrigin"], 6); // init map, set focus on the path's first point

    // tile attribution (required for Leaflet)
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // const cities = this.wrappedPoints(this.$store.getters["path/getPath"]);
    L.polyline(this.$store.getters["path/getPath"], { color: "#3cb35f" }).addTo(
      this.map
    ); // line between path markers

    let points = [];
    let index = 0;
    // generate path markers
    for (let marker of this.$store.getters["path/getPath"]) {
      const point = L.circle(marker, {
        color: "#3cb35f",
        fillColor: "#3cb35f",
        fillOpacity: 1,
        radius: 30000,
        customIndex: index,
      }).addTo(this.map);

      points.push(point);
      point.on("click", (e) => {
        // make click listeners for each path marker
        this.$store.commit("openModal", true);
        this.$store.commit("path/changeCity", e.target.options.customIndex);

        this.toggleSize();
      });
      index++;
    }
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    toggleSize() {
      this.$store.commit("changeLayout");
      this.map.invalidateSize();
    },
    mapTransition() {
      this.map.invalidateSize();
      let speed = 2;
      let newCity = this.$store.getters["path/getCurrentCityInfo"].coords;

      if (this.city > 0) {
        const oldCity = this.$store.getters["path/getPath"][this.city - 1];
        this.map.setView(oldCity, 6);

        speed = L.latLng(oldCity).distanceTo(L.latLng(newCity)) / 500000;
      }

      this.map.flyTo(newCity, 6, {
        duration: speed,
      });
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
    width: 200px;
    height: 200px;
    position: absolute !important;
    bottom: 0;
    right: 0;
  }
}
</style>