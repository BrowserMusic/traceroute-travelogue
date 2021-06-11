import * as Tone from "tone";
import SpeakerManager from "./SpeakerManager.js";
import BackgroundMusicManager from "./BackgroundMusicManager";

class AudioManager {
  constructor() {
    this.bufferEnabled = false;
    // console.log("building the audio manager");

  }

  setBuffer(buffer) {
    this.buffer = buffer;
    this.player = this.makeAudioPlayer(buffer);
    this.speech = new SpeakerManager(this.player);
    this.bg = new BackgroundMusicManager(buffer);
    this.bufferEnabled = true;
  }

  play(speaker, obj) {
    if (!this.bufferEnabled) return;
    this.speech.play(speaker, obj)
  }

  playBackground(sound) {
    if (!this.bufferEnabled) return;
    this.bg.play(sound);
  }

  stopBackground() {
    this.bg.stop();
  }

  makeAudioPlayer(speechFile) {
    return new Tone.Player(speechFile).toDestination();
  }

  beforeDestroy() {
    this.speech.beforeDestroy();
    this.player.dispose();
    this.buffer.dispose();
  }
}

export default AudioManager;