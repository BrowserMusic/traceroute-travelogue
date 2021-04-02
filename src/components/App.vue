<template>
  <div id="app">
    <LeafletMap />
    <ModalCityContainer v-if="isModalOpen"></ModalCityContainer>
  </div>
</template>

<script>
import ModalCityContainer from "./ModalCityContainer.vue";
import LeafletMap from "./LeafletMap.vue";

export default {
  name: "App",
  components: {
    LeafletMap,
    ModalCityContainer,
  },
  computed: {
    isModalOpen() {
      return this.$store.state.isModalOpen;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
