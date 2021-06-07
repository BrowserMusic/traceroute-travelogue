import * as Tone from "tone";
import speech from "../../data/speech.json";

class SpeakerSoundFile {
  constructor(player, settings) {
    this.player = player;
    this.once = (settings.style == "once") ? true : false;
    this.sounds = this.soundsAsBoundaries(settings.sounds);
  }

  play(length, mood) {
    if (this.once) {
      this.playRandomSound({ rate: this.makePlaybackRate() });
    } else {
      const events = this.makeEvents(length, mood);
      this.playSequence(events);
    }
  }

  playRandomSound(settings) {
    if (settings != null) {
      if ("rate" in settings) {
        this.player.playbackRate = settings.rate;
      }
    }
    const index = Math.floor(Math.random() * this.sounds.length);
    const duration = this.sounds[index].end - this.sounds[index].start;
    // console.log(this.sounds[index]);
    this.player.start(Tone.now(), this.sounds[index].start, duration);
    // console.log(this.player);
    // this.player.start(Tone.Transport.now() + 0.01, 0, 2);
  }

  // playSequence(events) {
  //   const seq = new Tone.Sequence(
  //     (time, note) => {
  //       mng[speaker].synth.modulationIndex.value = note.mod;
  //       mng[speaker].synth.triggerAttackRelease(note.pitch, 0.035, time);
  //     },
  //     events.events,
  //     events.speed
  //   );

  //   seq.start();
  //   seq.loop = false;
  // }

  // makeEvents(speaker, mood = "normal", limit = 5, deviance = 30) {
  //   // question, exclamation, puzzled, normal
  //   let events = [];
  //   let speed = 0.1;
  //   let pitch = mng[speaker].pitch;

  //   if (mood == "puzzled") {
  //     speed = 0.2;
  //   } else if (mood == "exclamation") {
  //     speed = 0.09;
  //     limit += 2;
  //   } else if (mood == "question") {
  //     limit += 1;
  //   }

  //   limit = Math.min(limit, 8);

  //   for (let i = 0; i < limit; i++) {
  //     if (mood == "question") {
  //       pitch += 20;
  //     }
  //     events[i] = {
  //       pitch: pitch + (Math.random() * deviance - deviance / 2),
  //       mod: Math.random() * 20 + 10,
  //     };
  //   }

  //   return { events: events, speed: speed };
  // }

  makePlaybackRate() {
    let rate = Math.random() * 0.2;
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