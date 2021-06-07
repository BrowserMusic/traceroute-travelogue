import * as Tone from "tone";
import SpeakerSoundFile from "./SpeakerSoundFile.js";
import SpeakerSynth from "./SpeakerSynth.js";
// import folks from "../data/characters.json";

class AudioManager {
  constructor(folks, speechFile) {
    console.log(folks);
    this.voices = {};
    this.player = this.makeAudioPlayer(speechFile);

    for (let f of Object.keys(folks)) {
      if (!("audio" in folks[f]) || folks[f].audio.type == "base") {
        const settings = ("audio" in folks[f]) ? folks[f].audio : {};
        this.voices[f] = new SpeakerSynth(settings);
      } else if (folks[f].audio.type == "file") {
        this.voices[f] = new SpeakerSoundFile(this.player, folks[f].audio);
      }
    }

    // console.log(this.)
  }

  play(speaker, { mood, length }) {
    this.voices[speaker].play(mood, length);
  }

  makeAudioPlayer(speechFile) {
    return new Tone.Player(speechFile).toDestination();
  }

  beforeDestroy() {
    for (let s of Object.keys(this.voices)) {
      s.beforeDestroy();
    }

    this.player.dispose();
  }
}

export default AudioManager;