<template>
  <div id="mapContainer"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  name: "LeafletMap",
  data() {
    return {
      map: null,
    };
  },
  props: {
    city: Number,
  },
  watch: {
    city: function (old, newV) {
      this.map.setView(this.$store.getters.getCurrentCityInfo.coords, 6);
    },
  },
  mounted() {
    this.map = L.map("mapContainer").setView(this.$store.getters.getOrigin, 6); // init map, set focus on the path's first point

    // tile attribution (required for Leaflet)
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    L.polyline(this.$store.getters.getPath, { color: "#3cb35f" }).addTo(
      this.map
    ); // line between path markers

    let points = [];
    let index = 0;
    // generate path markers
    for (let marker of this.$store.getters.getPath) {
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
        this.$store.commit("changeCity", e.target.options.customIndex);
        this.map.setView(this.$store.getters.getCurrentCityInfo.coords, 6, {
          duration: 1,
        });
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
    // moveToCity(c) {
    //   this.map.setView(this.$store.getters.getCurrentCityInfo.coords, 6);
    // }
  },
};
</script>

<style scoped>
#mapContainer {
  margin: 0 auto;
  width: 80vw;
  height: 80vh;
}
</style>