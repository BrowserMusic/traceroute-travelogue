import dinner from "../data/food.json";

const dining = {
  namespaced: true,
  state: () => ({
    foods: dinner.foods,
    parts: dinner.parts,
    tools: dinner.tools,
    plates: dinner.plates
  }),
  mutations: {
    openModal(state, f) {
      state.isModalOpen = f;
    },
    changeCity(state, city) {
      state.currentCity = city;
    }
  },
  getters: {
    getRandomFoods: (state) => {
      let retval = [];
      getRandomItems(state.foods.list, 5, (item) => {
        const scale = ("scale" in item) ? item.scale : state.foods.baseScale;
        retval.push({ "name": item.name, "realname": item.realname, "scale": scale });
      })

      return retval;
    },
    getRandomParts: (state) => {
      const item = state.parts.list[0];
      const scale = ("scale" in item) ? item.scale : state.parts.baseScale;
      return ({ "name": item.name, "realname": item.realname, "scale": scale });
    },
    getRandomPlate: (state) => {
      let retval = {};
      getRandomItems(state.plates.list, 1, (plate) => {
        const scale = ("scale" in plate) ? plate.scale : state.plates.baseScale;
        retval = { "name": plate.name, "realname": plate.realname, "scale": scale, "position": [0, -0.75, 0] };
      });
      return retval;
    },
    getRandomTools: (state) => {
      let retval = [];
      let index = 0;
      getRandomItems(state.tools.list, 2, (tool) => {
        const scale = ("scale" in tool) ? tool.scale : state.tools.baseScale;
        const position = (index == 0) ? [-1, -0.75, 0] : [1, -0.75, 0];
        retval.push({ "name": tool.name, "realname": tool.realname, "scale": scale, "position": position, "rotation": [0, Math.PI / 2, 0] });
        index++;
      });

      return retval;
    }
  }
}

function getRandomItems(list, count, callback) {
  for (let i = 0; i < count; i++) {
    var item = list[Math.floor(Math.random() * list.length)];
    // retval.push({ "name": item, "scale": 2 });
    callback(item);
  }
}

export default dining;