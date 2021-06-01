const audio = {
  namespaced: true,
  state: () => ({
    audioFiles: {},
    bgMusic: {
      playing: false,
      file: ""
    }
  }),
  mutations: {
    changeBGMusic(state, obj) {
      if (!obj) {
        state.bgMusic.playing = false;
      } else {
        state.bgMusic.playing = obj.playing;

        if ('file' in obj) {
          state.bgMusic.file = obj.file;
        }
      }
    }
  }
}

export default audio;
