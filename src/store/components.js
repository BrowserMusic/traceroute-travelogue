const comps = {
  namespaced: true,
  state: () => ({
    character: {},
    ipv4: {},
    bigtext: {},
    bighello: {},
    error: {},
    draganddrop: {},
    bigbutton: {},
    pamphlet: {},
    hub: {},
    link: {},
    imgtimer: {},
    mediabg: {},
    concert: {},
    video: {},
    gifmess: {}
  }),
  mutations: {
    updateComponents(state, block) {
      if (!("components" in block)) {
        return;
      }

      for (let comp of block.components) {
        if (!(comp.name in state)) {
          console.error();
        } else {
          state[comp.name] = {
            ...state[comp.name],
            ...comp
          }
        }
      }
    }
  },
  getters: {
    getAllActive(state) {
      let retval = {};
      for (let key of Object.keys(state)) {
        if ("state" in state[key] && state[key].state != "stop") {
          retval[key] = state[key];
        }
      }
      return retval;
    }
  },
  actions: {

  }
}

export default comps;