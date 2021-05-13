import Vue from "vue";
import Vuex from "vuex";
// import pathBlock from "../data/paths.json";
// import dinner from "../data/food.json";
import dining from "./dinner.js";
import path from "./path.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dining,
    path,
  },
  state: () => ({
    count: 0,
    isModalOpen: false,
  }),
  mutations: {
    openModal(state, f) {
      state.isModalOpen = f;
    },
  },
  getters: {
  }
})