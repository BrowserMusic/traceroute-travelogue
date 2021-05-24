import pathBlock from "../data/paths.json";
import story from "../data/story.json";

const path = {
  namespaced: true,
  state: () => ({
    currentPath: 0, // index of current path
    currentCity: 0, // index of city in path
    paths: pathBlock,// the base one when you load geotraceroute: nuremberg to missoula 
    story: story,
    sceneIndex: 5, // index of current scene node inside city
    lineIndex: 0, // index of current line if dialogue is present
    freezeState: false
  }), // 4 + 45
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
    },
    changeLine(state, line) {
      if (line != undefined) {
        state.lineIndex = line;
      } else {
        state.lineIndex++;
      }
    },
    freeze(state, f) {
      state.freezeState = f;
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
    getLine: (state, getters) => {
      const scene = getters.getScene;
      if ("lines" in scene) {
        return scene.lines[state.lineIndex - 1];
      } else {
        return null;
      }
    },
    getLineList: (state, getters) => {
      const scene = getters.getScene;
      if ("lines" in scene) {
        return scene.lines;
      } else {
        return null;
      }
    }
  },
  actions: {
    next({ state, commit, getters }) {
      if (state.freezeState) return;

      const lines = getters.getLineList;
      const scenes = getters.getCurrentChapter;
      if (lines != null) {
        if (state.lineIndex + 1 < lines.length) {
          console.log('nextline');
          commit("changeLine");
          return;
        }
      }
      if (state.sceneIndex + 1 < scenes.length) {
        console.log('next scene');
        commit("changeScene");

        if (getters.getLineList != null) {
          commit("changeLine", 0);
        }
      } else {
        if (state.currentCity + 1 < state.story.length) {
          console.log('next city');
          commit("changeCity");
          commit("changeScene", 0);
          if (getters.getLineList != null) {
            commit("changeLine", 0);
          }
        } else {
          console.log("no more cities! you're boned!");
        }
      }

    },
    // nextLine({ state, commit, getters }) {
    //   if (!getters.getScene.includes("lines")) {
    //     return;
    //   }
    //   else if (state.lineIndex >= getters.getScene.lines.length) {
    //     commit('changeScene');
    //     commit('changeLine', 0);
    //     return;
    //   } else {
    //     const retval = getters.getLine;
    //     commit('changeLine');
    //     return retval;
    //   }
    // },
    nextScene({ commit }) {
      // console.log("SCENE CHANGE");
      commit("changeLine", 0);
      commit("changeScene");
    }
  }
}

// function adjustForAM(coord) {
//   if (coord[1] < 0) {
//     coord[1] = (180 - Math.abs(coord[1])) + 180;
//   }

//   return coord;
// }

export default path;