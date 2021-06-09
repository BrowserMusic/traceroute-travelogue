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

// class SpritePlayer() {
//   constructor(file) {
//     this.player = new Tone.Player(speechFile).toDestination();
//   }

//   playSoundEvent(sound, time) {
//     if ("rate" in sound) {
//       this.player.playbackRate = sound.rate;
//     }
//     time = (time == null) ? Tone.now() : time;

//     this.player.start(time, sound.start, sound.duration);
//   }

//   getRandomSound() {
//     const index = Math.floor(Math.random() * this.sounds.length);
//     const duration = this.sounds[index].end - this.sounds[index].start;

//     return {
//       start: this.sounds[index].start,
//       duration: duration
//     };
//   }
// }

export default AudioManager;