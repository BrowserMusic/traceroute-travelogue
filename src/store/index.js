import Vue from 'vue';
import Vuex from "vuex";
import pathBlock from "../data/paths.json";
import dinner from "../data/food.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    currentPath: 0, // index of current path
    currentCity: 0, // index of city in path
    isModalOpen: false,
    paths: pathBlock,// the base one when you load geotraceroute: nuremberg to missoula
    foods: dinner.foods,
    parts: dinner.parts,
    tools: dinner.tools,
    plates: dinner.plates
  },
  mutations: {
    openModal(state, f) {
      state.isModalOpen = f;
    },
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
    getRandomFoods: (state) => {
      let retval = [];
      getRandomItems(state.foods.list, 5, (item) => {
        const scale = ("scale" in item) ? item.scale : state.foods.baseScale;
        retval.push({ "name": item.name, "scale": scale });
      })

      return retval;
    },
    getRandomParts: (state) => {
      const item = state.parts.list[0];
      const scale = ("scale" in item) ? item.scale : state.parts.baseScale;
      return ({ "name": item.name, "scale": scale });
    },
    getRandomPlate: (state) => {
      let retval = {};
      getRandomItems(state.plates.list, 1, (plate) => {
        const scale = ("scale" in plate) ? plate.scale : state.plates.baseScale;
        retval = { "name": plate.name, "scale": scale, "position": [0, -0.75, 0] };
      });

      console.log(retval);
      return retval;
    },
    getRandomTools: (state) => {
      let retval = [];
      let index = 0;
      getRandomItems(state.tools.list, 2, (tool) => {
        const scale = ("scale" in tool) ? tool.scale : state.tools.baseScale;
        const position = (index == 0) ? [-1, -0.75, 0] : [1, -0.75, 0];
        retval.push({ "name": tool.name, "scale": scale, "position": position, "rotation": [0, Math.PI / 2, 0] });
        index++;
      });

      return retval;
    }
  }
})

function getRandomItems(list, count, callback) {
  for (let i = 0; i < count; i++) {
    var item = list[Math.floor(Math.random() * list.length)];
    // retval.push({ "name": item, "scale": 2 });
    callback(item);
  }
}