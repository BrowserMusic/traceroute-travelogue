import * as Tone from "tone";
import SpeakerSoundFile from "./SpeakerSoundFile.js";
import SpeakerSynth from "./SpeakerSynth.js";
import folks from "../../data/characters.json";

class SpeakerManager {
  constructor(player) {
    this.voices = {};
    this.player = player;
    this.default = new SpeakerSynth({ wave: "sine", pitch: 440.0 });

    for (let f of Object.keys(folks)) {
      if (!("audio" in folks[f]) || folks[f].audio.type == "base") {
        const settings = ("audio" in folks[f]) ? folks[f].audio : {};
        this.voices[f] = new SpeakerSynth(settings);
      } else if (folks[f].audio.type == "file") {
        this.voices[f] = new SpeakerSoundFile(this.player, folks[f].audio);
      }
    }
  }

  play(speaker, { mood, length }) {
    if (speaker in this.voices) {
      this.voices[speaker].play(mood, length);
    } else {
      this.default.play(mood, length);
    }
  }

  makeAudioPlayer(speechFile) {
    return new Tone.Player(speechFile).toDestination();
  }

  beforeDestroy() {
    for (let s of Object.keys(this.voices)) {
      this.voices[s].beforeDestroy();
    }

    this.player.dispose();
  }
}

export default SpeakerManager;