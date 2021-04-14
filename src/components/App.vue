<template>
  <div id="app">
    <LeafletMap :city="myCity" />
    <ModalCityContainer
      v-if="isModalOpen"
      @changeCity="passCityVal"
    ></ModalCityContainer>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
