import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    currentPath: 0, // index of current path
    currentCity: 0, // index of city in path
    isModalOpen: false,
    paths: // the base one when you load geotraceroute: nuremberg to missoula
      [
        [
          { coords: [49.446278, 11.073978], name: "Nuremberg" },
          { coords: [50.114963, 8.658529], name: "Frankfurt" },
          { coords: [52.365904, 4.887474], name: "Amsterdam" },
          { coords: [53.407733, -2.982116], name: "Liverpool" },
          { coords: [45.553852, -73.624592], name: "Montreal" },
          { coords: [43.704, -79.367105], name: "Toronto" },
          { coords: [41.488703, -81.714795], name: "Cleveland" },
          { coords: [41.858966, -87.671574], name: "Chicago" },
          { coords: [38.054897, -97.931986], name: "Kansas" },
          { coords: [39.746435, -104.974626], name: "Denver" },
          { coords: [40.781722, -111.934227], name: "Salt Lake" },
          { coords: [47.602723, -122.333308], name: "Seattle" },
          { coords: [46.864812, -114.018641], name: "Missoula" }
        ]
      ]
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    openModal(state, f) {
      // console.log("modal state: " + f);
      state.isModalOpen = f;
    },
    changeCity(state, city) {
      state.currentCity = city;
    }
  },
  getters: {
    getPath: (state) => {
      return state.paths[state.currentPath].map(value => value.coords);
    },
    getOrigin: (state) => {
      return state.paths[state.currentPath][state.currentCity].coords;
    },
    getCurrentCityInfo: (state) => {
      return state.paths[state.currentPath][state.currentCity];
    }
  }
})

// export default createStore;