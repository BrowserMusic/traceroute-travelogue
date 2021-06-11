import pathBlock from "../data/paths.json";
import comps from "./components.js";

import wellington from "../data/story/1_wellington.json";
import whanganui from "../data/story/2_whanganui.json";
import auckland from "../data/story/3_auckland.json";
import tasman from "../data/story/4_tasman.json";
import sydney1 from "../data/story/5_sydney1.json";
import perth from "../data/story/6_perth.json";
import sydney2 from "../data/story/7_sydney2.json";
import cali from "../data/story/8_california.json";
import manhattan from "../data/story/9_manhattan.json";
import toronto from "../data/story/10_toronto.json";
import ashburn from "../data/story/11_ashburn.json";
import cville from "../data/story/12_charlottesville.json";

function prepJSON() {
  const path = [sydney1, perth, sydney2, cali, manhattan, toronto, ashburn, cville, wellington, whanganui, auckland, tasman, sydney1, perth, sydney2, cali, manhattan, toronto, ashburn, cville];
  for (let j = 0; j < path.length; j++) {
    for (let i = 0; i < path[j].length; i++) {
      path[j][i].index = i;
      if ("lines" in path[j][i]) {
        for (let o = 0; o < path[j][i].lines.length; o++) {
          path[j][i].lines[o].index = o;
        }
      }
    }
  }

  return path;
}

const path = {
  namespaced: true,
  modules: {
    comps
  },
  state: () => ({
    currentPath: 0, // index of current path
    currentCity: 0, // index of city in path
    paths: pathBlock,// the base one when you load geotraceroute: nuremberg to missoula 
    story: prepJSON(),
    sceneIndex: 0, // index of current scene node inside city
    lineIndex: 0, // index of current line if dialogue is present
    freezeState: false,
    isFastForward: false
  }), // 4 + 45
  mutations: {
    changeCity(state, city) {
      if (city != null) {
        state.currentCity = city;
      } else {
        state.currentCity++;
      }

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
    },
    changeFastState(state, f) {
      state.isFastForward = f;
    },
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
    getSceneById: (state, getters) => (id) => {
      const filtered = getters.getCurrentChapter.filter((s) => {
        if ("pathid" in s && s.pathid == id) {
          return s;
        }
      });

      if (filtered.length > 0) {
        return filtered[0].index;
      } else {
        return "path node not found";
      }
    },
    getLine: (state, getters) => {
      const scene = getters.getScene;
      if ("lines" in scene) {
        return scene.lines[state.lineIndex]; //TODO change back to -1?
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
    async next({ state, commit, getters, dispatch }, obj) {
      const isFastForward = obj != null && "ignoreFreeze" in obj;
      if (state.freezeState && !isFastForward) return;
      else if (obj != null && "goto" in obj) {
        await dispatch("toOption", obj.goto);
      }

      const lines = getters.getLineList;
      const scenes = getters.getCurrentChapter;

      // try to change the line first: easiest
      if (lines != null) {
        if (state.lineIndex + 1 < lines.length) {
          commit("changeLine");
          commit("comps/updateComponents", getters.getLine);
          return;
        } else {
          if ("to" in getters.getLine && !isFastForward) {
            await dispatch("toOption", getters.getLine.to);
            return;
          }
          // console.log("longer than lines length");
        }
      }

      // then try to change the scene, see if that does it
      if (state.sceneIndex + 1 < scenes.length) {
        commit("changeScene");
        commit("comps/updateComponents", getters.getScene);
        // commit("changeLine", 0);
        console.log("next scene");

        if (getters.getLineList != null) {
          // console.log("which does contain lines, so we're resetting");
          commit("changeLine", 0);
        }
      } else {
        if (state.currentCity + 1 < state.story.length) {
          commit("changeScene", 0);
          commit("changeCity");
          commit("comps/updateComponents", getters.getScene);
          if (getters.getLineList != null) {
            commit("changeLine", 0);
          }
        } else {
          console.log("no more cities! you're boned!");
          return true;
        }
      }
    },
    toOption({ getters, commit }, tag) {
      const sceneIndex = getters.getSceneById(tag);
      commit("freeze", false);
      commit("changeScene", sceneIndex);
      commit("changeLine", 0);
      commit("comps/updateComponents", getters.getScene);
      // console.log(getters.getScene);
    },
    async fastForwardStep({ state, getters, dispatch }, obj) {
      const cityLimit = ("city" in obj) ? obj.city : getters.getPath.length - 1;
      let sceneLimit, lineLimit;

      // console.log("cityLimit", cityLimit);

      if (state.currentCity <= cityLimit) {
        if ("scene" in obj && state.currentCity == cityLimit) {
          sceneLimit = obj.scene;
        } else {
          sceneLimit = getters.getCurrentChapter.length;
        }
      } else {
        return false;
      }

      // console.log("sceneLimit", sceneLimit);

      if (state.sceneIndex <= sceneLimit) {
        if ("lines" in getters.getScene) {
          if ("line" in obj && state.sceneIndex == sceneLimit) {
            // console.log("exist");
            lineLimit = obj.line;
          } else {
            // console.log("not");
            lineLimit = getters.getScene.lines.length;
          }
        }
        else {
          lineLimit = -1;
        }
      } else {
        return false;
      }

      // console.log("lineLimit", lineLimit);

      if (state.currentCity <= cityLimit && state.sceneIndex <= sceneLimit) {
        if (lineLimit == -1 || state.lineIndex <= lineLimit) {
          const isEnd = await dispatch("next", { "ignoreFreeze": true });
          if (isEnd) return false;
          else {
            return {
              "current": {
                "city": state.currentCity, "scene": state.sceneIndex, "line": state.lineIndex
              },
              "limit": {
                "city": cityLimit, "scene": sceneLimit, "line": lineLimit
              },
              "under": true
            };
          }
        } else {
          return false;
        }
      }
    },
    nextScene({ commit }) {
      // console.log("SCENE CHANGE");
      commit("changeLine", 0);
      commit("changeScene");
    }
  }
}

export default path;