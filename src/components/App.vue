<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <LeafletMap />
    <ModalCityContainer v-if="isModalOpen"></ModalCityContainer>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
import ModalCityContainer from "./ModalCityContainer.vue";
import LeafletMap from "./LeafletMap.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
    LeafletMap,
    ModalCityContainer,
  },
  // data() {
  //   return {
  //     showModal: false,
  //   };
  // },
  computed: {
    isModalOpen() {
      // console.log(this.$store.isModalOpen);
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
