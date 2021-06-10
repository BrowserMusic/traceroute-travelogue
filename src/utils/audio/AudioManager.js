import * as Tone from "tone";
import SpeakerManager from "./SpeakerManager.js";
import BackgroundMusicManager from "./BackgroundMusicManager";
const speechFile = "/audio/speech.mp3";

class AudioManager {
  constructor() {
    this.player = this.makeAudioPlayer(speechFile);
    this.speech = new SpeakerManager(this.player);
    this.bg = new BackgroundMusicManager(speechFile);
  }

  play(speaker, obj) {
    this.speech.play(speaker, obj)
  }

  playBackground(sound) {
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
  }
}

export default AudioManager;