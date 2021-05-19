import pathBlock from "../data/paths.json";
import story from "../data/story.json";

const path = {
  namespaced: true,
  state: () => ({
    currentPath: 0, // index of current path
    currentCity: 0, // index of city in path
    paths: pathBlock,// the base one when you load geotraceroute: nuremberg to missoula 
    story: story,
    sceneIndex: 0,
  }),
  mutations: {
    changeCity(state, city) {
      state.currentCity = city;
    },
    changeScene(state, scene) {
      if (scene != null) {
        state.sceneIndex = scene;
      } else {
        state.sceneIndex++;
      }
    }
  },
  getters: {
    // split the coordinates away from the city names
    getPath: (state) => {
      return state.paths[state.currentPath];
    },
    getPathCoords: (state, getters) => {
      return getters.getPath.map(value => value.coords);
    },
    // get the first point of the current path, for map focusing
    getOrigin: (state, getters) => {
      return getters.getPath[0];
    },
    getDestination: (state, getters) => {
      return getters.getPath[getters.tripLength - 1];
    },
    // get the current city
    getCurrentCityInfo: (state, getters) => {
      return getters.getPath[state.currentCity];
    },
    tripLength: (state, getters) => {
      return getters.getPath.length;
    },
    getCurrentChapter: (state) => {
      return state.story[state.currentCity];
    },
    getScene: (state) => {
      return state.story[state.currentCity][state.sceneIndex];
    },

  }
}

// function adjustForAM(coord) {
//   if (coord[1] < 0) {
//     coord[1] = (180 - Math.abs(coord[1])) + 180;
//   }

//   return coord;
// }

export default path;