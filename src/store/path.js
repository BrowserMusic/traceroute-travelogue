import pathBlock from "../data/paths.json";

const path = {
  namespaced: true,
  state: () => ({
    currentPath: 0, // index of current path
    currentCity: 0, // index of city in path
    paths: pathBlock,// the base one when you load geotraceroute: nuremberg to missoula 
  }),
  mutations: {
    changeCity(state, city) {
      state.currentCity = city;
    }
  },
  getters: {
    // split the coordinates away from the city names
    getPath: (state) => {
      return state.paths[state.currentPath].map(value => value.coords);
    },
    // get the first point of the current path, for map focusing
    getOrigin: (state) => {
      return state.paths[state.currentPath][state.currentCity].coords;
    },
    // get the current city
    getCurrentCityInfo: (state) => {
      return state.paths[state.currentPath][state.currentCity];
    },
    tripLength: (state) => {
      return state.paths[state.currentPath].length;
    },
  }
}

export default path;