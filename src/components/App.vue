<template>
  <div id="app">
    <LeafletMap />
    <ChapterNode :index="myCity" v-if="isModalOpen" />
    <!--
    <ModalCityContainer
      v-if="isModalOpen"
      @changeCity="passCityVal"
    ></ModalCityContainer>
    -->
  </div>
</template>

<script>
// import ModalCityContainer from "./ModalCityContainer.vue";
import LeafletMap from "./LeafletMap.vue";
import ChapterNode from "./ChapterNode.vue";

export default {
  name: "App",
  components: {
    LeafletMap,
    // ModalCityContainer,
    ChapterNode,
  },
  data() {
    return {
      myCity: 0,
    };
  },
  computed: {
    isModalOpen() {
      return this.$store.state.isModalOpen;
    },
  },
  methods: {
    passCityVal(e) {
      this.myCity = e;
    },
  },
};
</script>

<style>
body {
  margin: 0;
  min-height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
