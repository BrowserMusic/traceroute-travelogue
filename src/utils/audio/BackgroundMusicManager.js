import * as Tone from "tone";
import speech from "../../data/speech.json";
let ref;

class BackgroundMusicManager {
  constructor(buffer) {
    this.player = new Tone.Player(buffer).toDestination();
    this.allSounds = speech.spritemap;
    this.currentSounds = [];
    this.isRepeating = false;

    ref = this;
  }

  play(sound) {
    // console.log(sound);
    this.stop();
    const shouldRepeat = ("repeat" in sound) ? sound.repeat : false;
    this.soundList = [];
    // this.player.sync();

    if (!shouldRepeat) {
      this.playSoundEvent(this.getSound(sound.name));
    } else {
      this.isRepeating = true;
      this.player.onstop = this.onEnd;
      this.sound = ("name" in sound) ? sound.name : null;
      this.interval = ("interval" in sound) ? sound.interval : null;
      this.soundList = ("list" in sound) ? sound.list : null;

      const sname = (this.sound != null) ? this.sound : sound.list[Math.floor(Math.random() * sound.list.length)];
      this.playSoundEvent(this.getSound(sname));
    }
  }

  stop() {
    this.isRepeating = false;
    this.player.onEnd = null;
    this.player.stop();
  }

  onEnd() {
    if (ref.isRepeating) {
      const sname = (ref.soundList != null) ? ref.soundList[Math.floor(Math.random() * ref.soundList.length)] : ref.sound;
      if (ref.interval != null) {
        const time = (ref.interval.type == "fixed") ? ref.interval.value : Math.random() * ref.interval.value[1] + ref.interval.value[0];
        console.log(time);
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

    if (this.player.state == "stopped") {
      this.player.start(time, sound.start, sound.duration);
    }
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