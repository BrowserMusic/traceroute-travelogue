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