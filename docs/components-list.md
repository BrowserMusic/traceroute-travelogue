# Components List

## `character`

`character` displays a character's icon on the left or right.

### example

```json
{
  "name": "character",
  "state": "start",
  "settings": {
    "name": "box",
    "align": "right"
  }
}
```

### settings
* `name`: the character's name. The list of possibilities is in `/src/data/characters.json, but your options are "box", "orb", and "mike" at the moment. 
* `align`: can be "left" or "right".

## `ipv4`

`ipv4` displays the IPv4 packet graphic.

### example

```json
{
  "name": "ipv4",
  "settings": {
    "highlight": [
      "source",
      "destination"
    ]
  }
}
```

### settings
* `highlight`: a list of all the blocks of the IPv4 packet, to change where the highlight is pointing. This always has to be a list of strings.

## `bigtext`

`bigtext` displays big text.

### example
```json
{
  "name": "bigtext",
  "state": "start",
  "settings": {
    "text": "what does it cost to use the internet?"
  }
}
```

### settings
* `text`: like it says on the can.

## `bigbutton`

`bigtext` displays a big button. **Freezes the state.**

### example
```json
{
  "name": "bigtext",
  "state": "start",
  "settings": {
    "text": "ENTER THE PACKETSPHERE?"
  }
}
```

### settings
* `text`: like it says on the can.

## `error`

`error` displays an error message that freezes the proceed button until it's clicked on. This are used almost exclusively with the `hub` component.

### example
```json
{
  "name": "error",
  "state": "start",
  "settings": {
    "title": "up to local network",
    "text": "You just came from there! We're not at our destination yet.",
    "to": "landing-whan"
  }
}
```

### settings
* `title`: title of the error message. currently not implemented.
* `text`: the text of the error message.
* `to`: what scene to go back to when you press OK. Make sure this is the `pathid` of the hub you're returning to.

## `draganddrop`

`draganddrop` lets you freeze the state until something is dragged from the source block to the destination block.

### example
```json
{
  "name": "draganddrop",
  "state": "start",
  "settings": {
    "img": "/images/floating_head.gif",
    "dropText": "Launch your packet into the packetsphere!",
    "dropImg": "/images/portal.gif"
  }
}
```

### settings
* `img`: the url of the thing you're dragging. Right now, only images can be dragged.
* `dropText`: the text that's displayed in the drop zone.
* `dropImg`: a background image to display in the drop zone. (optional)

## `pamphlet`

`pamphlet` displays the Internet Travel Guide.

### example
```json
{
  "name": "pamphlet",
  "state": "start",
  "settings": {
    "page": 1,
    "title": "Welcome!",
    "image": "/images/server-after.png",
    "text": "If you're reading this right now you're likely a packet about to start a journey across the internet."
  }
}
```

### settings
* `page`: `0` if you want to show the front cover, `1` if you want to open the book and show page contents.
* `title`: not implemented.
* `image`: the image to show at the top of the page.
* `text`: the body text of the page.

## `link`

`link` is used for image handouts, like the cable cross-section or the DNS root server map. When clicked, they open a new tab.

### example
```json
{
  "name": "link",
  "state": "start",
  "settings": {
    "img": "/images/root_dns_handout.jpeg",
    "url": "https://root-servers.org/#map",
    "text": "click me to find your closest root DNS servers!"
  }
}
```

### settings
* `img`: image to display.
* `url`: where you're going.
* `text`: text to display on top of the image. (optional)

## `imgtimer`

`imgtimer` shows an image for awhile before proceeding. **Freezes path.**

### example
```json
{
  "name": "imgtimer",
  "state": "start",
  "settings": {
    "src": "/images/loadscreen.gif",
    "timer": 2000
  }
}
```

### settings
* `src`: the image to display
* `timer`: how long the image should play before proceeding, in milliseconds.

## `mediabg`

`mediabg` shows an image or video behind everything else.

### example
```json
{
  "name": "mediabg",
  "state": "start",
  "settings": {
    "type": "video",
    "src": "/videos/aucklanddatacentre.mp4",
    "orientation": "vertical"
  }
}
```

### settings
* `type`: "image" or "video".
* `src`: the image or video url.
* `orientation`: this field is optional, and only matters if it needs to be set to "vertical".

## `concert`

`concert` is a little concert that shows an `audio` HTML element, with some text before and after. It listens for when the audio is finished to proceed. **Freezes path.**

### example
```json
{
  "name": "concert",
  "settings": {
    "src": "/audio/auck_data.mp3",
    "beforeText": "You find the source of the music again. Just one more listen, you say.",
    "afterText": "Do you feel that you have changed somehow? Perhaps you are smarter or more beautiful? Or is there some wisdom here? Rate this experience.",
    "choices": [
      "Strongly Agree",
      "Strongly Disagree"
    ],
    "to": "auck-departure"
  }
}
```

### settings
* `src`: the audio URL.
* `beforeText`: the text to display above the audio block.
* `afterText`: the text to display after the audio has finished playing.
* `choices`: buttons to display after the audio has finished playing. All of them lead to the same place.
* `to`: the `pathid` of the scene to go to when you're finished.

## `video`

`video` just shows a video in the foreground, with some text to explain it.

### example

```json
{
  "name": "video",
  "state": "start",
  "settings": {
    "src": "/videos/aucklanddatacentre.mp4",
    "text": "Looks like this might be the Auckland Data Centre from the outside. Smaller than you thought?",
    "to": "auck-strange"
  }
}
```

### settings
* `src`: video source
* `text`: text to display below the video
* `to`: which `pathid` to go to after this is done. Not currently optional.

## `hub`

`hub` lets you choose between multiple destinations. Generally there are 1-2 distractions, and one option that actually continues the plot.

This component is the most complicated by far, and needs multiple scenes to function correctly. Check "Going Out of Order" on the other docs page for an explanation.

### example
```json
{
  "type": "animation",
  "pathid": "landing-whan",
  "components": [
    {
      "name": "hub",
      "state": "start",
      "settings": {
        "locations": [
          {
            "text": "up to local network",
            "img": "/images/email.gif",
            "to": "err-whan-1"
          },
          {
            "text": "up to local network",
            "img": "/images/email.gif",
            "to": "err-whan-2"
          }
        ]
      }
    },
    {
      "name": "error",
      "state": "stop"
    }
  ]
}
```
### settings
For each location:

* `text`: the text of the option
* `img`: the gif to use as this option's "button"
* `to`: which scene you're going to.

**Note**  
* Make sure the scene containing the hub has a `pathid` that is different from any other scene.
* Add `stop`s for the components included in the 1-2 "distraction" scenes that aren't progressing the narrative.