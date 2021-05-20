import Vue from "vue";
import Vuex from "vuex";
import dining from "./dinner.js";
import path from "./path.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dining,
    path,
  },
  state: () => ({
    isModalOpen: false,
    layout: "map",
    showBigHello: false,
  }),
  mutations: {
    openModal(state, f) {
      state.isModalOpen = f;
    },
    openHello(state, f) {
      if (f != null) {
        state.showBigHello = false;
      } else {
        state.showBigHello = true;
      }

    },
    changeLayout(state, l) {
      // states are either "map" or "chapter"
      // console.log("before: " + state.layout);
      if (l != null) {
        state.layout = l;
      } else {
        state.layout = (state.layout == "map") ? "chapter" : "map";
      }

      // console.log("after: " + state.layout);
    }
  },
  getters: {
  }
})