import * as Tone from "tone";
import speech from "../../data/speech.json";
let ref;

class BackgroundMusicManager {
  constructor(speechFile) {
    this.player = new Tone.Player(speechFile).toDestination();
    this.player.onstop = this.onEnd;
    this.allSounds = speech.spritemap;
    this.currentSounds = [];
    this.isRepeating = false;

    ref = this;
  }

  play(sound) {
    console.log(sound);
    this.stop();
    const shouldRepeat = ("repeat" in sound) ? sound.repeat : false;
    this.soundList = [];

    if (!shouldRepeat) {
      console.log("sound shouldnt repeat");
      this.playSoundEvent(this.getSound(sound.name));
    } else {
      console.log("sound should repeat");
      this.isRepeating = true;
      this.sound = ("name" in sound) ? sound.name : null;
      this.interval = ("interval" in sound) ? sound.interval : null;
      this.soundList = ("list" in sound) ? sound.list : null;

      const sname = (this.sound != null) ? this.sound : sound.list[Math.floor(Math.random() * sound.list.length)];
      this.playSoundEvent(this.getSound(sname));
    }
  }

  stop() {
    this.isRepeating = false;
    this.player.stop();
  }

  onEnd() {
    if (ref.isRepeating) {
      const sname = (ref.soundList != null) ? ref.soundList[Math.floor(Math.random() * ref.soundList.length)] : ref.sound;
      if (ref.interval != null) {
        const time = (ref.interval.type == "fixed") ? ref.interval.value : Math.random() * ref.interval.value[1] + ref.interval.value[0];
        ref.playSoundEvent(ref.getSound(sname), `+${time}`);
      } else {
        ref.playSoundEvent(ref.getSound(sname));
      }
    }
  }

  playSoundEvent(sound, time) {
    if ("rate" in sound) {
      this.player.playbackRate = sound.rate;
    }
    time = (time == null) ? Tone.now() : time;

    this.player.start(time, sound.start, sound.duration);
  }

  getSound(index) {
    try {
      const duration = this.allSounds[index].end - this.allSounds[index].start;

      return {
        start: this.allSounds[index].start,
        duration: duration
      };
    } catch (e) {
      console.log(index);
      console.log(this.allSounds);
      // console.log(e);
    }

  }

  soundsAsBoundaries(fnames) {
    let retval = [];
    for (let name of fnames) {
      retval.push(speech.spritemap[name]);
    }

    return retval;
  }

  beforeDestroy() {
    this.player.dispose();
  }
}

export default BackgroundMusicManager;