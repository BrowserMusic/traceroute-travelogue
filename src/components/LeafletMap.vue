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
  mounted() {
    this.map = L.map("mapContainer").setView(this.$store.getters.getOrigin, 4);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    L.polyline(this.$store.getters.getPath, { color: "red" }).addTo(this.map);

    let points = [];
    let index = 0;
    for (let marker of this.$store.getters.getPath) {
      const point = L.circle(marker, {
        color: "red",
        fillColor: "#f03",
        fillOpacity: "0.5",
        radius: 30000,
        customIndex: index,
      }).addTo(this.map);

      points.push(point);
      point.on("click", (e) => {
        // console.log(e);
        // console.log(e.target.options.customIndex);
        this.$store.commit("openModal", true);
        this.$store.commit("changeCity", e.target.options.customIndex);
      });
      index++;
    }
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
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