# Dealing with Audio

All of the audio files (currently just the speech files, but eventually everything) is one long audiosprite – just a single file with a bunch of silences in between. Here's how we make/edit the audiosprite.

## Make the file

To generate this file, and the necessary JSON file that gives us exact start/end points, we need the [audiosprite](https://github.com/tonistiigi/audiosprite) library. Install that with `npm install -g audiosprite`. To make it work, you'll likely need to install [ffmpeg](https://evermeet.cx/ffmpeg/) (there's a "Download as ZIP" link).

To make this work, `cd` to the folder with all the speech files in it. I've got an abbreviated version right now that's in `/public/audio/speech`. Any audio files you want to add should go in that folder. Then run this command:

`audiosprite -o speech -e "mp3" *.mp3`

It makes the sprite and the JSON file, only generates an mp3 output, and uses every mp3 in the folder it's called in. Double check that the sounds you expect are in the file, but otherwise, congratulations! You made the file.

Drag the file out of the `speech` folder into the enclosing `audio` folder. This keeps you from adding the old audiosprite export into the new audiosprite.

## Update some JSON

Now that we've updated the audio file, we need to update some JSON. First, copy what you have in the generated `speech.json`. Go to `/src/data/speech.json`, and replace the contents of that file with the new copy.

## Speech: Update more JSON

Next, if you've added new files or changed file names, you need to update the character listing to include those file names. That's in `/src/data/characters.json`. Here's the orb, as an example:

```json
"orb": {
  "name": "Orb",
  "display": {
    "type": "video",
    "file": "/videos/orb-silent.mp4"
  },
  "audio": {
    "type": "file",
    "style": "once",
    "sounds": [
      "orb_short",
      "orb_short2",
      "orb_short3",
      "orb_short4",
      "orb_short5",
      "orb_short6"
    ]
  }
},

```

Under the "audio" section, `type` can either be "base" or "file." "base" is the default FM synth, "file" is how we use audio files. If you're using `"type": "file"`, `style` can be "once" or "many." "once" means only one file is played, "many" means it behaves similar to the way the FM synth behaves – i.e., a sometimes-directed string of sounds. **("many" isn't implemented yet, but I'm working on it!)**

If you add or change files on a `"type": "file"`, add their names to the `sounds` list. The value you use should be the same as the original file name, which will also be reflected in the speech.json you generated earlier. Spelling and capitalization count!

## Background/Triggers: Update more JSON

How about background sounds and triggers that have nothing to do with speech? We've got that, too!

```json
{
  "type": "animation",
  "components": ["....", "component info etc"],
  "audio": {
    "repeat": true,
    "interval": {
      "type": "random",
      "value": [
        1,
        3
      ]
    },
    "name": "orb_short6",
    "list": [
      "orb_short4",
      "orb_short5"
    ]
  }
}
```

This is a random scene. Here are what all these things mean:

* `audio` needs to exist in order for background audio or triggers to happen.
* `repeat` will play something once, or not.
* `name` is the filename you want to play. If you're repeating a list of sounds, `name` will always be the first thing that plays.
* `interval` lets you set an interval of silence between plays of sounds. This can be fixed or random.
  * To always have a two-second break between sounds, do `"interval": "fixed", "value": 2`
  * To get a random value between 1 and 3 seconds, use the code shown above.
* `list` lets you set a list of possible clips to pick from when you repeat.

### Stop background audio?

In the next scene, do `"audio": false`. 