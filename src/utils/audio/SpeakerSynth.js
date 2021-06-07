import * as Tone from "tone";

class SpeakerSynth {
  constructor(settings) {
    const wave = ("wave" in settings) ? settings.wave : "sine";
    const pitch = ("pitch" in settings) ? settings.pitch : 440.0;
    const maxLength = ("maxLength" in settings) ? settings.maxLength : 12;
    this.synth = this.makeDefaultSynth(wave);
    this.pitch = pitch;
    this.maxLength = maxLength;
  }

  play(length, mood) {
    this.synth.modulationIndex.value = Math.random() * 20 + 10;

    if (this.maxLength == 1 || length == 1) {
      const event = this.generateRandomEvent(this.pitch);
      this.playEvent(event.pitch, event.mod, Tone.now());
    } else {
      this.playSequence(length, mood);
    }
  }

  playSequence(length, mood) {
    const events = this.makeEvents(length, mood);
    const seq = new Tone.Sequence(
      (time, note) => {
        this.playEvent(note.pitch, note.mod, time);
        // this.synth.modulationIndex.value = note.mod;
        // this.synth.triggerAttackRelease(note.pitch, 0.035, time);
      },
      events.events,
      events.speed
    );

    seq.start();
    seq.loop = false;
  }

  makeEvents(mood = "normal", limit = 5, deviance = 30) {
    // question, exclamation, puzzled, normal
    let events = [];
    let speed = 0.1;
    let pitch = this.pitch;

    if (mood == "puzzled") {
      speed = 0.2;
    } else if (mood == "exclamation") {
      speed = 0.09;
      limit += 2;
    } else if (mood == "question") {
      limit += 1;
    }

    limit = Math.min(limit, 8);

    for (let i = 0; i < limit; i++) {
      if (mood == "question") {
        pitch += 20;
      }

      events[i] = this.generateRandomEvent(pitch);
      // events[i] = {
      //   pitch: pitch + (Math.random() * deviance - deviance / 2),
      //   mod: Math.random() * 20 + 10,
      // };
    }

    return { events: events, speed: speed };
  }

  playEvent(pitch, mod, time = 0) {
    this.synth.modulationIndex.value = mod;
    this.synth.triggerAttackRelease(pitch, 0.035, time);
  }

  generateRandomEvent(pitch, deviance = 30) {
    return {
      pitch: pitch + (Math.random() * deviance - deviance / 2),
      mod: Math.random() * 20 + 10,
    };
  }

  makeDefaultSynth(stype) {
    return new Tone.FMSynth({
      volume: -6,
      oscillator: {
        type: stype,
      },
      harmonicity: 2,
      modulationIndex: 12.22,
      modulation: {
        type: "square",
      },
    }).toDestination();
  }

  beforeDestroy() {
    this.synth.dispose();
  }
}

export default SpeakerSynth;