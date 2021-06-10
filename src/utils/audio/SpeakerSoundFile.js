import * as Tone from "tone";
import speech from "../../data/speech.json";

class SpeakerSoundFile {
  constructor(player, settings) {
    this.player = player;
    this.once = (settings.style == "once") ? true : false;
    this.speed = ("speed" in settings) ? settings.speed : 0.5;
    this.sounds = this.soundsAsBoundaries(settings.sounds);
    this.maxLength = ("maxLength" in settings) ? settings.maxLength : 5;
  }

  play(length, mood) {
    if (this.once) {
      let sound = this.getRandomSound();
      sound.rate = this.makePlaybackRate();
      this.playSoundEvent(sound);
    } else {
      const events = this.makeEvents(length, mood);
      this.playSequence(events);
    }
  }

  playSoundEvent(sound, time) {
    if ("rate" in sound) {
      this.player.playbackRate = sound.rate;
    }
    time = (time == null) ? Tone.now() : time;

    this.player.start(time, sound.start, sound.duration);
  }

  getRandomSound() {
    const index = Math.floor(Math.random() * this.sounds.length);
    const duration = this.sounds[index].end - this.sounds[index].start;

    return {
      start: this.sounds[index].start,
      duration: duration
    };
  }

  playSequence(events) {
    const seq = new Tone.Sequence(
      (time, sound) => {
        console.log("next event");
        this.playSoundEvent(sound, time);
        // mng[speaker].synth.modulationIndex.value = note.mod;
        // mng[speaker].synth.triggerAttackRelease(note.pitch, 0.035, time);
      },
      events.events,
      events.speed
    );

    seq.start();
    seq.loop = false;
  }

  makeEvents(mood = "normal", limit = 5, deviance = 0.1) {
    // question, exclamation, puzzled, normal
    let events = [];
    let fireRate = this.speed;     // speed of the series of files
    let playbackRate = 1.0; // speed of an individual file

    if (mood == "puzzled") {
      fireRate += 0.1;
    } else if (mood == "exclamation") {
      fireRate -= 0.05;
      limit += 2;
    } else if (mood == "question") {
      limit += 1;
    }

    limit = Math.min(limit, this.maxLength);

    for (let i = 0; i < limit; i++) {
      if (mood == "question") {
        playbackRate += 0.05;
      }
      const sound = this.getRandomSound();
      events[i] = {
        start: sound.start,
        duration: sound.duration,
        rate: playbackRate + (Math.random() * deviance - deviance / 2)
      };
    }

    return { events: events, speed: fireRate };
  }

  makePlaybackRate() {
    let rate = Math.random() * 0.1;
    rate *= (Math.random() > 0.5) ? 1 : -1;
    rate += 1;
    return rate;
  }

  soundsAsBoundaries(fnames) {
    let retval = [];
    for (let name of fnames) {
      retval.push(speech.spritemap[name]);
    }

    return retval;
  }

  beforeDestroy() {
    return;
  }
}

export default SpeakerSoundFile;