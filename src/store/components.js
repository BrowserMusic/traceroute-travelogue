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
    gifmess: {},
    dining: {},
    http: {},
    resourcetimer: {}
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
    },
    componentUpdateSelf(state, block) {
      if (!(block.name in state)) {
        console.error();
        return;
      }

      state[block.name].settings = block.data;
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
    },
    getResourceTimerSize(state) {
      if ("settings" in state.resourcetimer) {
        console.log("inside getting the timer size");
        const data = state.resourcetimer.settings;
        console.log(data);
        // let total = 0;
        const reducer = (a, b) => a + b.encodedBodySize;
        const res = data.reduce(reducer, 0);
        return formatBytes(res);
      }
    }
  },
  actions: {

  }
}

const formatBytes = function(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export default comps;